import React, { useState, useContext }from 'react';
import "bulma/css/bulma.css";
import { v4 as uuidv4 } from 'uuid';
import {GradeDeterminationContext} from '../context/GradeDeterminationContext.js';

function GradeDetermination(){

    const[inputFields, setInputFields] = useContext(GradeDeterminationContext);

    const[totalPercent, setTotalPercent ] = useState(0);

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value;
          }
          return i;
        })
        setInputFields(newInputFields);
    }

    const handleChangeWeight = (id, event)=>{
        const newInputFields = inputFields.map(i => {
            if(id === i.id) {
              i['weight'] = event.target.value;
            }
            return i;
        })
        setTimeout(()=>changePercent(parseInt(event.target.value)),1000);
        setInputFields(newInputFields);
    }

    const changePercent = (percent) =>{
        let newPercent = isNaN(percent)?0:percent;
        let totPercent = totalPercent + newPercent;
        if(totPercent > 100){
            alert("Please ensure total weight adds to 100%")
        }
        setTotalPercent(totPercent);
    }
    const handleAddFields=()=>{
        setInputFields([...inputFields,{id: uuidv4(), weight:'',item:'',outcomes:''}]);
    }
    
    const handleDeleteFields =(id)=>{
        const values  = [...inputFields];
        const deletedIndex = values.findIndex(value => value.id === id);
        const deletedWeight = values[deletedIndex].weight;
        values.splice(deletedIndex, 1);
        changePercent(-parseInt(deletedWeight));
        setInputFields(values);
    }

    return(
        <div className = "field">
           <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Grade Determination</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="columns">
                                <div className = "column is-two-fifths">
                                    <label className="label">Item</label>
                                </div>
                                <div className = "column is-one-fifth">
                                    <label className="label">Components Evaluated</label>
                                </div>
                                <div className = "column is-one-fifth">
                                    <label className="label">Weight (%)</label>
                                </div>
                            </div>
                            {inputFields.map(inputField=> (
                                    <div key = {inputField.id}>
                                        <div className="columns">
                                        <div className = "column is-two-fifths">
                                            <input 
                                            className="input is-dark"
                                            name = "item" 
                                            type="text" 
                                            placeholder="eg. Assignments" 
                                            value = {inputField.item}
                                            onChange = {(event) =>handleChangeInput(inputField.id, event)}
                                            />
                                        </div>
                                        <div className = "column is-one-fifth">
                                            <input 
                                            className="input is-dark"
                                            name = "outcomes" 
                                            type="text" 
                                            placeholder="eg. 1-3" 
                                            value = {inputField.outcomes}
                                            onChange = {(event) =>handleChangeInput(inputField.id, event)}
                                            />
                                        </div>
                                        <div className = "column is-one-fifth">
                                            <input 
                                            className="input is-dark"
                                            name = "weight" 
                                            type="text" 
                                            placeholder="eg. 10" 
                                            value = {inputField.weight}
                                            onChange = {(event) =>handleChangeWeight(inputField.id, event)}
                                            />
                                        </div>
                                        <div className = "column">
                                            <p className = "buttons">
                                                <button className="button is-warning" onClick ={() =>{
                                                    handleAddFields();
                                                    }}>
                                                    Add
                                                </button>
                                                <button className="button is-danger" 
                                                disabled = {inputFields.length===1}
                                                onClick = {() =>{
                                                    handleDeleteFields(inputField.id);
                                                }}>
                                                    Delete
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="columns">
                                <div className = "column is-three-fifths"></div>
                                <div className = "column is-one-fifth">
                                    <h3 className = "title">Total: {totalPercent}%</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GradeDetermination;