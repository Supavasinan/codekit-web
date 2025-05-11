import { pgTable, text, doublePrecision, boolean, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const reviewStarEnum = pgEnum("review_star", ["0", "1", "2", "3", "4", "5"]);

export const products = pgTable("products", {

    //META DATA
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    shortDescription: text("short_description"),

    //Price and mother fucker
    price: doublePrecision("price").notNull(),
    discountTo: doublePrecision("discount_to"),
    isDiscount: boolean("is_discount").default(false),

    //Fucking stock
    stock: integer("stock").default(0), //This is stock
    isAvailable: boolean("is_available").default(true),
    sold: integer("sold").default(0),

    //products z
    imageUrl: text("image_url").notNull(),

    //category ID
    categoryId: text("category_id").notNull(),

    //Reviewzzzz
    reviewStar: reviewStarEnum("review_star").notNull().default("0"),

    //META
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

})

export const cartItems = pgTable("cart_items", {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    addedAt: timestamp("added_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  });


export const category = pgTable("categories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(), 
    description: text("description"), 
    imageUrl: text("image_url").notNull(),
  
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  });

export const banner = pgTable("banners", {
    id: text("id").primaryKey(),
    imageUrl: text("image_url").notNull(),

    display: boolean("display").notNull().default(true),
})
