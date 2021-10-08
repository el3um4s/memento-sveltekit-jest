/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import RandomButton from "$lib/RandomButton.svelte";
import { render, fireEvent  } from '@testing-library/svelte';



test('Button and Value are in the document', () => {
    const randomButton = render(RandomButton); 
    
    const button = randomButton.getByRole('button');
    expect(button).toBeVisible();
    
    const textValue = randomButton.getByTestId('value');
    expect(textValue).toBeVisible();
});


test('Color value: red if < 0', () => {
    const randomButton = render(RandomButton, {value: -1});

    const textValue = randomButton.getByTestId('value');
    expect(textValue).toHaveTextContent("-1");

    expect(textValue).toHaveStyle(`
    background-color: #ec4343;
    color: #f0f0f0;
    `);
})

test('Color value: green if > 0', () => {
    const randomButton = render(RandomButton, {value: 1});

    const textValue = randomButton.getByTestId('value');
    expect(textValue).toHaveTextContent("1");

    expect(textValue).toHaveStyle(`
    background-color: #5fac5f;
    color: #f0f0f0;
    `);
})

test('Random value is hidden (value = default)', () => {
    const randomButton = render(RandomButton);
    const randomNumber = randomButton.getByTestId('random-value');
    expect(randomNumber).toBeInTheDocument();
    expect(randomNumber).not.toBeVisible();
    expect(randomNumber).toHaveTextContent('0');    
})

test('Random value is hidden (value != default)', () => {
    const randomButton = render(RandomButton, { value: 100});
    const randomNumber = randomButton.getByTestId('random-value');
    expect(randomNumber).toBeInTheDocument();
    expect(randomNumber).not.toBeVisible();
    expect(randomNumber).toHaveTextContent('0');    
})

test('Button is blue', () => {
    const randomButton = render(RandomButton);
    const button = randomButton.getByRole('button');
    expect(button).toHaveClass('blue');
})


test('Random Number on click', async () => {
    const randomButton = render(RandomButton);
    const button = randomButton.getByRole('button'); 
    await fireEvent.click(button);

    const randomNumber = randomButton.getByTestId('random-value');
    expect(randomNumber).toBeInTheDocument();
    expect(randomNumber).not.toBeVisible();
    expect(randomNumber).not.toHaveTextContent('0');    
})

test('Change Value on Click', async () => {
    const randomButton = render(RandomButton);
    const button = randomButton.getByRole('button'); 
    const valueOriginal = parseInt(randomButton.getByTestId('value').textContent);

    await fireEvent.click(button);

    const randomNumber = parseInt(randomButton.getByTestId('random-value').textContent);
    const valueResult = randomButton.getByTestId('value');

    const valueExpected = valueOriginal + randomNumber;

    expect(valueResult).toHaveTextContent(`${valueExpected}`);
})
