import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

//render form dynamically wih react hook form

export default function App() {
    const { register, handleSubmit, formState: {errors} } = useForm({mode: 'onBlur'});
    const onSubmit = (data) => {
        console.log(data);
        alert('Form submit suceess!');
    };
    const tableData = {
        "modal": [
          {
            "section": "Beneficiary Name and Country",
            "order": 1,
            "components": [
              {
                "key": "name",
                "type": "textbox",
                "label": "Beneficiary name",
                "order": 1,
                "rule": {
                  "required": true,
                  "maxLength": 10
                }
              },
              {
                "key": "country",
                "type": "textbox",
                "label": "Beneficiary Country",
                "order": 2,
                "rule": {
                  "required": true,
                  "maxLength": 10
                }
              }
            ]
          },
          {
            "section": "Mode of Receiving Payment",
            "order": 2,
            "components": [
              {
                "key": "mode",
                "type": "radio",
                "label": "Mode of Payment",
                "options": [
                  {
                    "label": "Bank",
                    "value": "Bank"
                  },
                  {
                    "label": "other",
                    "value": "other"
                  }
                ],
                "order": 1,
                "rule": {
                  "required": true
                }
              }
            ]
          },
          {
            "section": "Bank Account Details",
            "components": [
              {
                "key": "accountNum",
                "type": "textbox",
                "label": "Beneficiary Account Number",
                "order": 1,
                "rule": {
                  "required": true,
                  "maxLength": 10
                }
              },
              {
                "key": "bankRoutingCode",
                "type": "textbox",
                "label": "Beneficiary Bank Routing code",
                "order": 2,
                "rule": {
                  "required": true,
                  "maxLength": 10
                }
              },
              {
                "key": "address",
                "type": "textbox",
                "label": "Beneficiary Address",
                "order": 3
              }
            ]
          }
        ]
      };
    //validate form with react hook form
    const validateForm = (rule, value) => {
        if (rule && rule.required && !value) {
            return "This fild is required";
        }
        if (rule && rule.maxLength && value.length > rule.maxLength) {
            return 'The fild length is invalid';
        }
        return true;
    }
    //render form dynamically with tableData

    return (    
      <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Yoko Test with Github Copilot!</h1>
            {tableData.modal.map((section, index) => {
                return (
                    <div key={index}>
                        <h2>{section.section}</h2>
                        {section.components.map((component, index) => {
                            return (
                                <div key={index} className='item'>
                                    <label>{component.label}</label>
                                    {component.type === "textbox" && <input type="text" name={component.key} {...register(component.key, { validate: (value) => validateForm(component.rule, value) })} />}
                                    {errors && errors[component.key] && <p style={{color: "red"}}>{errors[component.key].message}</p>}
                                    {component.type === "radio" && component.options.map((option, index) => {
                                        return (
                                            <div key={index}>
                                                <input type="radio" name={component.key} value={option.value} {...register(component.key, { validate: (value) => validateForm(component.rule, value) })}/>
                                                <label>{option.label}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )
            }
            )}
            <input value="Submit" type="submit" />
        </form>
    );
}

