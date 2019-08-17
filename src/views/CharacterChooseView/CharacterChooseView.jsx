import React from 'react';

import './CharacterChooseView.scss';

const normalizePreferences = (preferences = {}) => {
  return {
    legs: 0,
    lowFloor: false,
    rampOrLift: false,
    strollerSpace: false,
    wheelChairSpace: false,
    delayBetweenStops: 0,
    ...preferences,
  };
};

const CharacterChooseView = (props) => {
  const [ characters ] = React.useState([
    {
      age: 23,
      name: 'Alex',
      speed: 4.8,
      preferences: normalizePreferences(),
    },
    {
      age: 28,
      name: 'Ash',
      speed: 3.9,
      preferences: normalizePreferences({
        delayBetweenStops: 10,
      }),
    },
    {
      age: 26,
      name: 'Willy',
      speed: 2.3,
      preferences: normalizePreferences({
        rampOrLift: true,
        wheelChairSpace: true,
        delayBetweenStops: 120,
      }),
    },
    {
      age: 71,
      name: 'Em',
      speed: 2.9,
      preferences: normalizePreferences({
        legs: 1,
        delayBetweenStops: 60,
      }),
    },
    {
      age: 42,
      name: 'Shelly',
      speed: 3.4,
      preferences: normalizePreferences({
        lowFloor: true,
        strollerSpace: true,
        delayBetweenStops: 60,
      }),
    },
  ]);

  return (
    <div className='CharacterChooseView'>
      CharacterChooseView

      <div className='CharacterChoose'>
        {
          characters.map((character, i) => (
            <div
              key={i}
              className='CharacterChoose__character'
            >
              <h3 className='CharacterChoose__character-name'>
                {character.name}
              </h3>
              <ul className='CharacterChoose__character-preferences'>
                {
                  Object.keys(character.preferences).map((preferenceKey) => (
                    <li>
                      <input
                        type='checkbox'
                        checked={character.preferences[preferenceKey]}
                        disabled={true}
                      />
                      {preferenceKey}
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CharacterChooseView;
