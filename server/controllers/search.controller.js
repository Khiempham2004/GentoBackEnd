import { name } from "body-parser";
import searchSchema from "../models/search.gento.js";

export const searchController = async (req, res) => {
    try {
        const { query, category, priceMin, priceMax } = req.query;
        const filter = {};

        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
            // return res.status(201).json({ message: "Vui lòng cung cấp lại từ khóa tìm kiếm. !" })
        };

        if (category) {
            filter.category = category;
        };

        if (priceMin || priceMax) {
            filter.price = {};
            if (priceMin) filter.price.$gte = Number(priceMin);
            if (priceMax) filter.price.$lte = Number(priceMax);
        }

        const products = await searchSchema.find(filter, {
            // $or: [
            //     { name: { $regex: query, $options: 'i' } },
            //     { desription: { $regex: query, $options: 'i' } }
            // ]
        });
        res.json({ success: true, data: products })
    } catch (error) {
        res.status(404).json({
            message: "Lỗi server", error
        })
        console.log(error);
    }
}

export const addSearch = async (req, res) => {
    try {
        const { name, description, category, price, brand } = req.body;

        const newAddSearch = new searchSchema({
            name,
            desription,
            category,
            price,
            brand
        });
        await newAddSearch.save();
        res.json({
            success: true,
            message: "Thêm sản phẩm thành công",
            product: newAddSearch
        })
    } catch (error) {
        res.status(500).json({
            seccess: false,
            message: 'Lỗi server',
            error
        })
    }
}