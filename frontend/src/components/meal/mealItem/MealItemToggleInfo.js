import React, { useState } from 'react';
import parse from 'html-react-parser';

export default function MealItemToggleInfo({ recipeInfo }) {
    
    const [selected, setSelected] = useState('ingredients');

    const toggleInfo = (e, info) => {
        e.preventDefault();
        if (info === 'ingredients') {
            setSelected('ingredients');
        } else {
            setSelected('instructions');
        }
    }

    const renderInstructions = () => {
        let parser = new DOMParser();
        let instructions = parser.parseFromString(recipeInfo.instructions, 'text/html');
        instructions.querySelectorAll('li').forEach((instruction, idx) => {
            instruction.className = 'list-item instruction';
            const number = document.createElement('p');
            number.className = 'instruction-number';
            number.innerHTML = idx + 1;
            instruction.prepend(number);
        })
        
        instructions = instructions.body.innerHTML;
       
        return instructions;
    }
 
    if (selected === 'ingredients') {
        return (
            <div className='meal-item-extended-info-div'>
                <section className='toggle-buttons-section'>
                    <button onClick={e => toggleInfo(e, 'ingredients')} className='toggle-info selected-toggle-info'>Ingredients</button>
                    <button onClick={e => toggleInfo(e, 'instructions')} className='toggle-info'>Instructions</button>
                </section>
                <section className='info-list-section'>
                    <ul className='info-list'>
                        {Object.values(recipeInfo.extendedIngredients).map((ingredient, idx) => <li className='list-item' key={idx}>{ingredient.original}</li>)}
                    </ul>
                </section>
            </div>
        )
    } else {
        return (
            <div className='meal-item-extended-info-div'>
                <section className='toggle-buttons-section'>
                    <button onClick={e => toggleInfo(e, 'ingredients')} id='ingredients' className='toggle-info'>Ingredients</button>
                    <button onClick={e => toggleInfo(e, 'instructions')} id='instructions' className='toggle-info selected-toggle-info'>Instructions</button>
                </section>
                <section className='info-list-section'>
                    {parse(renderInstructions())}
                </section>
            </div>
        )
    }
}
