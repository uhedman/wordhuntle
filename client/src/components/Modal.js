import React from 'react';
import Share from './Share';
import History from './History';
import Info from './Info';
import Words from './Words'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';

const ModalComponent = () => {
	const found = useSelector(state => state.progress.found);
	const words = useSelector(state => state.gameData.words);
	const isOpen = useSelector(state => state.modal.isOpen);
	const content = useSelector(state => state.modal.content);
	const dispatch = useDispatch();

	const options = {
		'': { title: '', component: ''},
		'share': { title: 'Comparte tus resultados', component: <Share />},
		'history': { title: 'Palabras de ayer', component: <History />},
		'info': { title: 'Cómo jugar', component: <Info />},
		'words': { title: `Palabras encontradas (${found.length}/${words.length})`, component: <Words />}
	}

	return (
    <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{options[content].title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
				{options[content].component}
			</Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
