/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Autocomplete, Slider, TextField } from '@mui/material';
import { Form } from 'react-bootstrap';

export default function FilterBox({
  title, filterType, options, step, filters, setFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function valuetext(value) {
    return value;
  }

  return (
    <div className="filter-box">
      <p className="filter-box-title" onClick={() => setIsOpen(!isOpen)}>{title}</p>
      <div className={`filter-box-items ${!isOpen ? 'd-none' : ''}`}>
        {filterType === 'number' && (
        <Slider
          key={title}
          defaultValue={[options[0].value, options[1].value]}
          className="filter-slider"
          getAriaValueText={valuetext}
          min={options[0].value}
          max={options[1].value}
          step={step}
          valueLabelDisplay="auto"
          marks={options}
          onChangeCommitted={(event, value) => setFilters(title, value)}
        />
        )}
        {filterType === 'autocomplete' && (
        <Autocomplete
          multiple
          id="search-autocomplete"
          size="small"
          value={filters}
          onChange={(event, value) => setFilters(title, value)}
          options={options.sort((a, b) => -b.charAt(0).localeCompare(a.charAt(0)))}
          groupBy={(option) => option.charAt(0)}
          limitTags={3}
          ListboxProps={{ style: { maxHeight: '200px', overflow: 'auto' } }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={`Choose ${title}`}
            />
          )}
        />
        )}
        {filterType === 'checkbox' && (
        <Form.Group>
          {options.map((option) => (
            <Form.Check
              key={option.value}
              type="checkbox"
              label={`${option.value} (${option.count})`}
              checked={filters.includes(option.value)}
              onChange={(event) => {
                if (event.target.checked) {
                  setFilters('stores', [...filters, option.value]);
                } else {
                  setFilters('stores', filters.filter((item) => item !== option.value));
                }
              }} // eslint-disable-line  react/jsx-no-bind
            />
          ))}
        </Form.Group>
        )}
      </div>
    </div>
  );
}
