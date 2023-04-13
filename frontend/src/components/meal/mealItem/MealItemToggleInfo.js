import React, { useEffect, useState } from 'react';
import { parseRecipeInstructions } from '../../util/ApiUtil';

export default function MealItemToggleInfo({ recipeInfo }) {
    
    const [selected, setSelected] = useState('ingredients');
    const [instructions, setInstructions] = useState("");

    useEffect(() => {
        async function parseInstructions() {
            const recipeInfoResponse = await parseRecipeInstructions(recipeInfo.id);
            setInstructions(recipeInfoResponse)
        }
        parseInstructions();
    })

    const toggleInfo = (e, info) => {
        e.preventDefault();
        if (info === 'ingredients') {
            setSelected('ingredients');
        } else {
            setSelected('instructions');
        }
    }

    const renderInstructions = () => {
        return instructions.map((instruction, idx) => {
            return (
                <li key={idx} className='list-item instruction'>
                    <p className='instruction-number'>{instruction.number}</p>
                    {instruction.step}
                </li>
            )
        });
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
                    {renderInstructions()}
                </section>
            </div>
        )
    }
}
