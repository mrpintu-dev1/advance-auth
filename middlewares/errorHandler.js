export const errorHandler = (req, res, next) => {
    return res.status(500).json({msg: 'Something went wrong!!! Please try again later.'});
};