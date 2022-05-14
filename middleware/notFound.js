export default (req, res, next) => {
    res.status(404).send(`page not found`);
}