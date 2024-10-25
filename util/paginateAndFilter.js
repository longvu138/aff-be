import { Sequelize } from "sequelize"

// utils/paginateAndFilter.js
export const paginateAndFilter = async (model, options) => {
    const { offset = 1, limit = 10, sort = [], filterConditions = [], include = [] } = options

    const offsetHandle = +(offset > 0 ? offset - 1 : 1) * limit

    // Tạo điều kiện WHERE từ các filterConditions
    const whereConditions = filterConditions.reduce((acc, [field, value, operator = 'like']) => {
        if (value) {
            if (operator === 'like') {
                acc[field] = { [Sequelize.Op.like]: `%${value}%` }
            } else {
                acc[field] = { [Sequelize.Op[operator]]: value }
            }
        }
        return acc
    }, {})

    console.log("whereConditions", whereConditions);
    

    // Tạo truy vấn
    const query = {
        where: whereConditions,
        offset: offsetHandle,
        limit,
        order: sort.length ? sort : [['createdAt', 'DESC']],
        include,
        // logging: console.log, // In câu SQL ra console
    }

    // Thực hiện truy vấn
    const result = await model.findAndCountAll(query)
    
    return {
        totalItems: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: offset,
        items: result.rows,
    }
}
