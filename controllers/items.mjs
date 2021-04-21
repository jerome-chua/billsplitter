export default function initItemsController(db) {
  const addItem = async (req, res) => {
    try {
      const { itemData } = req.body;

      const items = await db.Item.create(itemData);
      console.log('item added!: \n-----\n', items);

      res.send(items);
    } catch (err) {
      console.error('item NOT added! \n-----\n', err);
    }
  };

  return {
    addItem,
  };
}
