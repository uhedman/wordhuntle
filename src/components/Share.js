import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Share = () => {
	const [copied, setCopied] = useState(false);
	const found = useSelector(state => state.storage.found);
	const points = useSelector(state => state.storage.points);
	const theme = useSelector(state => state.storage.theme);
	const level = useSelector(state => state.level);

	const copy = async () => {
		const shareDiv = document.querySelector('#share');
		const text = shareDiv.textContent;

		await navigator.clipboard.writeText(text);

		setCopied(true);
	}

	const date = new Date();
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();

	return (
		<div className='d-flex flex-column gap-1'>
			<div id='share' className='dark rounded p-2'>
				<p className='m-0'>wordhuntle - {day} de {month} de {year}</p>
				<p className='m-0'>Nivel {level}/8 — {points} puntos — {found.length} palabras</p>
			</div>
			<Button variant={theme} onClick={copy}>{copied ? "Copiado!" : "Copiar"}</Button>
		</div>
	);
}

export default Share;
