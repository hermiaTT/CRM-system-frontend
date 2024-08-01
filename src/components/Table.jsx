import React, { useContext } from 'react'
import { EmployeesContext } from '../view/Employees';

const DataRow = ({ item }) => (
    <tr>
      {Object.keys(item).map((key, index) => {
        if (typeof item[key] === 'object' && item[key] !== null) {
          return (
            Object.keys(item[key]).map((subKey, subIndex) => (
              <td scope = 'col' key={subIndex}>{item[key][subKey] ? item[key][subKey] : 'N/A'}</td>
            ))
          );
        }
        return (
          <td key={index}>{item[key] ? item[key] : 'N/A'}</td>
        );
      })}
    </tr>
  );
const Table = ({data}) => {

    const headers = data && data.length > 0 ? Object.keys(data[0]).flatMap(key => (
        typeof data[0][key] === 'object' && data[0][key] !== null ? Object.keys(data[0][key]) : key
      )) : [];
    console.log(data);
    return (
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              {headers && headers.map((header, index) => (
                <th scope = 'row' key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <DataRow key={index} item={item} />
            ))}
          </tbody>
        </table>
      );
};


export default Table