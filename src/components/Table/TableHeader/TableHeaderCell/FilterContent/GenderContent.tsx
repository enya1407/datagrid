import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { visibilityGenderSelector } from '../../../../../selector/selector';
import { changeVisibilityGenderAction } from '../../../../../actions';
import styles from '../TableHeaderCell.module.css';

const GenderContent = () => {
  const genderCheckbox = useSelector(visibilityGenderSelector);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={genderCheckbox.Male}
          className={styles.input}
          onChange={() => dispatch(changeVisibilityGenderAction('Male'))}
        />
        Male
      </div>
      <div>
        <input
          type="checkbox"
          checked={genderCheckbox.Female}
          className={styles.input}
          onChange={() => dispatch(changeVisibilityGenderAction('Female'))}
        />
        Female
      </div>
    </div>
  );
};

export default GenderContent;
