const statesData = require('../models/statesData.json');
const State = require('../models/State');

const getAllStates = async (req, res) => {
  try {
    const { contig } = req.query;
    let states = statesData;

    if (contig === 'true') {
      states = states.filter((state) => state.code !== 'AK' && state.code !== 'HI');
    } else if (contig === 'false') {
      states = states.filter((state) => state.code === 'AK' || state.code === 'HI');
    }

    if (states.length === 0) {
      return res.status(404).json({ error: 'No states found' });
    }

    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch states' });
  }
};

const getStateByCode = async (req, res) => {
  try {
    const { state } = req.params;

    const foundState = statesData.find((s) => s.code.toLowerCase() === state.toLowerCase());

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    res.json(foundState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch state data' });
  }
};

const getStateCapital = async (req, res) => {
  try {
    const { state } = req.params;

    const foundState = statesData.find((s) => s.code.toLowerCase() === state.toLowerCase());

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    const { state: stateName, capital_city: capital } = foundState;

    res.json({ state: stateName, capital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch state capital' });
  }
};

const getStateNickname = async (req, res) => {
  try {
    const { state } = req.params;

    const foundState = statesData.find((s) => s.code.toLowerCase() === state.toLowerCase());

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    const { state: stateName, nickname } = foundState;

    res.json({ state: stateName, nickname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch state nickname' });
  }
};

const getStatePopulation = async (req, res) => {
  try {
    const { state } = req.params;

    const foundState = statesData.find((s) => s.code.toLowerCase() === state.toLowerCase());

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    const { state: stateName, population } = foundState;
    const formattedPopulation = population.toLocaleString();

    res.json({ state: stateName, population: formattedPopulation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch state population' });
  }
};

const getStateAdmission = async (req, res) => {
  try {
    const { state } = req.params;

    const foundState = statesData.find((s) => s.code.toLowerCase() === state.toLowerCase());

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    const { state: stateName, admission_date: admission } = foundState;

    res.json({ state: stateName, admitted: admission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch state admission' });
  }
};

const getRandomFunFact = async (req, res) => {
  try {
    const { state } = req.params;

    const foundState = statesData.find((s) => s.code.toLowerCase() === state.toLowerCase());

    if (!foundState) {
      return res.status(404).json({ message: `No Fun Facts found for ${state}` });
    }

    const { funfacts } = foundState;

    if (!funfacts || funfacts.length === 0) {
      return res.status(404).json({ message: `No Fun Facts found for ${foundState.state}` });
    }

    const randomIndex = Math.floor(Math.random() * funfacts.length);
    const randomFunFact = funfacts[randomIndex];

    res.json({ state: foundState.state, funfact: randomFunFact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch random Fun Fact' });
  }
};

const addStateFunFacts = async (req, res) => {
  try {
    const { state } = req.params;
    const { funfacts } = req.body;

    const foundState = await State.findOne({ code: state });

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    const uniqueFunFacts = [...new Set([...foundState.funfacts, ...funfacts])];
    foundState.funfacts = uniqueFunFacts;
    
    await foundState.save();

    res.json({ message: 'Fun facts added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add fun facts' });
  }
};

const insertStateCodes = async () => {
  try {
    const stateCodes = [
      { stateCode: 'AL' },
      { stateCode: 'AK' }
    ];

    await State.insertMany(stateCodes);
    console.log('State codes inserted successfully');
  } catch (error) {
    console.error('Failed to insert state codes:', error);
  }
};

insertStateCodes();

module.exports = {
  getAllStates,
  getStateByCode,
  getStateCapital,
  getStateNickname,
  getStatePopulation,
  getStateAdmission,
  getRandomFunFact,
  addStateFunFacts
};
