const { isAlpha, isInt } = require("validator");

const Order = require("../../order/model/Order");
const User = require("../../users/model/User");
const errorHandler = require("../../utils/errorHandler/errorHandler");

async function getOrders(req, res) {
	try {
		let foundOrder = await Order.find({});

		res.json({
			message: "SUCCESS",
			foundOrder,
		});
	} catch (error) {
		res.json(500).json(errorHandler(error));
	}
}

async function deleteOrder(req, res) {
	try {
		let deletedOrder = await Order.findByIdAndDelete;

		if (!deletedOrder) {
			return res
				.status(404)
				.json({ message: "FAILURE", error: "record not found" });
		}

		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });

		let userOrderHistoryArray = foundUser.orderHistory;

		let filteredOrderHistoryArray = userOrderHistoryArray.filter(
			(item) => item._id.toString() !== req.params.id
		);

		foundUser.orderHistory = filteredOrderHistoryArray;

		await foundUser.save();

		res.json({
			message: "SUCCESS",
			deleted: deletedOrder,
		});
	} catch (error) {
		res.status(500).json(errorHandler(error));
	}
}

async function createOrder(req, res) {
	try {
		const { orderName, orderAmount, orderItem } = req.body;

		let errObj = {};

		console.log(res.locals);

		if (!isAlpha(orderName)) {
			errObj.orderName = "Order can only use letters";
		}

		if (!isInt(orderAmount)) {
			errObj.orderAmount = "Order amount can only be a number";
		}

		if (Object.keys(errObj).length > 0) {
			return res.status(500).json({
				messsage: "ERROR",
				error: errObj,
			});
		}

		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });

		const createdOrder = new Order({
			orderName,
			orderAmount,
			orderItem,
			orderOwner: foundUser._id,
		});

		let savedOrder = await createdOrder.save();

		foundUser.orderHistory.push(savedOrder._id);

		await foundUser.save();

		res.json({ message: "SUCCESS", createdOrder });
	} catch (error) {
		errorHandler(error)
	}
}

async function updateOrder(req, res) {
	try {
		let foundOrder = await Order.findById(req.params.id);

		if (!foundOrder) {
			res.status(404).json({
				message: "FAILURE",
				error: "Order not found",
			});
		} else {
			let updatedOrder = findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});

			res.json({ message: "SUCCESS", payload: updatedOrder });
		}
	} catch (error) {
		res.status(500).json(errorHandler(error));
	}
}

module.exports = {
	getOrders,
	deleteOrder,
	createOrder,
	updateOrder,
};
