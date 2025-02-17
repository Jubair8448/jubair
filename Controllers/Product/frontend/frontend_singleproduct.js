const product = require("../../../Models/product");
const category = require("../../../Models/category");
const variant = require("../../../Models/product_variant");
const wishlist = require("../../../Models/wishlist");
const mongoose = require("mongoose");

const frontend_singleproduct = async (req, res) => {
  try {
    // Validate req.params.id
    if (!req.params || !req.params.id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const productId = req.params.id;
    const data = await product.findById(productId);

    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Ensure req.user exists
    const user_id = req.user?.id || 0;

    let wishlist_status = false;

    if (user_id) {
      const productWishlistEntry = await wishlist.findOne({
        user_id,
        product_id: productId,
      });
      wishlist_status = !!productWishlistEntry;
    }

    let parentcategory = await fetchchildcategory(data.parent_category);
    let childcategory = await fetchchildcategory(data.child_category);

    const productvariant = await variant.find({ product_id: productId });

    const variantIds = productvariant.map((v) => v._id);
    const variantWishlistEntries = await wishlist.find(user_id === 0 ? 
      { product_variant_id: { $in: [] } } : 
      { user_id, product_variant_id: { $in: variantIds } }
    );

    const variantWishlistMap = new Map(
      variantWishlistEntries.map((entry) => [entry.product_variant_id.toString(), true])
    );

    let combinedDynamicAttributes = [];
    const variantsWithWishlistStatus = productvariant.map((variant) => {
      const dynamicAttributesVariant = variant.dynamicAttributes || [];
      combinedDynamicAttributes = [...data.dynamicAttributes, ...dynamicAttributesVariant];
      const variantWishlistStatus = variantWishlistMap.has(variant._id.toString());
      return {
        ...variant._doc,
        dynamicAttributes: combinedDynamicAttributes,
        wishlist_status: variantWishlistStatus,
      };
    });

    // Remove duplicate attributes
    const uniqueAttributes = Array.from(
      new Map(combinedDynamicAttributes.map((attr) => [JSON.stringify(attr), attr])).values()
    );

    res.json({
      status: "success",
      data: { ...data._doc, wishlist_status },
      parentcategory,
      childcategory,
      productvariant: variantsWithWishlistStatus,
      uniqueAttributes,
      slug: data.product_url.replace(/-/g, " "),
    });

  } catch (err) {
    console.error("Error in frontend_singleproduct:", err);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

// Helper function
const fetchchildcategory = async (categoryarray) => {
  if (!categoryarray || !categoryarray[0]) return [];

  try {
    const categoryIds = categoryarray[0].split(",");
    const objectIdArray = categoryIds.map((id) => new mongoose.Types.ObjectId(id));
    return await category.find({ _id: { $in: objectIdArray } });
  } catch (error) {
    console.error("Error fetching child categories:", error);
    return [];
  }
};

module.exports = frontend_singleproduct;
