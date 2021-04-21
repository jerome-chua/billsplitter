export default function initBillsController(db) {
  const addBillName = async (req, res) => {
    const { billData } = req.body;

    try {
      const newBill = await db.Bill.create(billData);
      console.log('newBill: ---', newBill);

      res.send(newBill);
    } catch (err) {
      res.status(500).send({ error: 'Unable to add new bill name! Try again.' });
      console.error('Error: \n-----\n', err);
    }
  };

  return {
    addBillName,
  };
}
