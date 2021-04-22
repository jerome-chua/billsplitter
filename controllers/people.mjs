export default function initPeopleController(db) {
  const personName = async (req, res) => {
    try {
      const { personData } = req.body;

      const createPerson = await db.Person.create(personData);

      res.send(createPerson);
    } catch (err) {
      console.error(err);
    }
  };

  const getNames = async (req, res) => {
    const { billId } = req.params;

    try {
      const people = await db.Person.findAll({
        where: {
          billId,
        },
      });

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
