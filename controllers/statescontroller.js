const State = require('../models/State');
const statesData = require('../models/statesData.json');

// Get all states
const getAllStates = async (req, res) => {
  try {
    const { contig } = req.query;
    const states = await State.find();
    const resultStates = [];

    for (const state of statesData) {
      const foundState = states.find(s => s.stateCode === state.code);

      if (contig === 'true') {
        if (state.code !== 'AK' && state.code !== 'HI' && foundState) {
          resultStates.push({ ...state, funfacts: foundState.funfacts });
        }
      } else {
        if (foundState) {
          resultStates.push({ ...state, funfacts: foundState.funfacts });
        } else {
          resultStates.push(state);
        }
      }
    }

    res.json(resultStates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch states' });
  }
};

// Get state by stateCode
const getState = async (req, res) => {
  const { state } = req.params;
  try {
    const stateData = await State.findOne({ stateCode: state });
    const foundState = statesData.find(s => s.code === state);

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    const stateWithFunFacts = { ...foundState };
    if (stateData) {
      stateWithFunFacts.funfacts = stateData.funfacts;
    }

    res.json(stateWithFunFacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch state' });
  }
};

// Get random fun fact for state
const getFunfact = async (req, res) => {
  const { state } = req.params;
  try {
    const stateData = await State.findOne({ stateCode: state });
    const foundState = statesData.find(s => s.code === state);

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    let funfact = '';
    if (stateData && stateData.funfacts.length > 0) {
      funfact = stateData.funfacts[Math.floor(Math.random() * stateData.funfacts.length)];
    }

    res.json({ state: foundState.name, funfact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fun fact' });
  }
};

// Get capital for state
const getCapital = async (req, res) => {
  const { state } = req.params;
  try {
    const foundState = statesData.find(s => s.code === state);

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    res.json({ state: foundState.name, capital: foundState.capital });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch capital' });
  }
};

// Get nickname for state
const getNickname = async (req, res) => {
  const { state } = req.params;
  try {
    const foundState = statesData.find(s => s.code === state);

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    res.json({  state: foundState.name, nickname: foundState.nickname });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch nickname' });
  }
};

// Get population for state
const getPopulation = async (req, res) => {
  const { state } = req.params;
  try {
    const foundState = statesData.find(s => s.code === state);

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    res.json({ state: foundState.name, population: foundState.population });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch population' });
  }
};

// Get admission date for state
const getAdmission = async (req, res) => {
  const { state } = req.params;
  try {
    const foundState = statesData.find(s => s.code === state);

    if (!foundState) {
      return res.status(404).json({ error: 'State not found' });
    }

    res.json({ state: foundState.name, admission: foundState.admission });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admission date' });
  }
};

module.exports = {
  getAllStates,
  getState,
  getFunfact,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission
};
