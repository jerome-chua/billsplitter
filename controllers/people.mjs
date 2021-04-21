export default function initPeopleController(db) {
  const personName = async (req, res) => {
    try {
      const { personData } = req.body;

      const createPerson = await db.Person.create(personData);
      console.log('createPerson: \n-----\n', createPerson);

      res.send(createPerson);
    } catch (err) {
      console.error(err);
    }
  };

  const getNames = async (req, res) => {
    const { billId } = req.params;

    try {
      const people = db.Person.findAll({
        where: {
          billId,
        },
      });

      console.log('my people called by my name: ----\n', people);

      res.send(people);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    personName,
    getNames,
  };
}
