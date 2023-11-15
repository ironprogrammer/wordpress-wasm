import { useState } from 'react';
import { MenuItem } from '@wordpress/components';
import { upload } from '@wordpress/icons';

import ImportForm from '../import-form';
import Modal from '../modal';
import { usePlaygroundContext } from '../playground-viewport/context';

type Props = { onClose: () => void };
export function RestoreFromZipMenuItem({ onClose }: Props) {
	const [isOpen, setOpen] = useState(false);
	const openModal = () => {
		setOpen(true);
	};
	const closeModal = () => {
		setOpen(false);
		onClose();
	};
	const { playground } = usePlaygroundContext();
	function handleImported() {
		// eslint-disable-next-line no-alert
		alert(
			'File imported! This Playground instance has been updated. Refreshing now.'
		);
		closeModal();
		playground!.goTo('/');
	}
	if (!playground) {
		return null;
	}
	return (
		<>
			<MenuItem
				icon={upload}
				iconPosition="left"
				id="import-open-modal--btn"
				aria-label="Download the current playground as a .zip file"
				onClick={openModal}
			>
				Restore from .zip
			</MenuItem>

			<Modal
				isOpen={isOpen}
				contentLabel='This is a dialog window which overlays the main content of the
				page. The modal begins with a heading 2 called "Import
				Playground". Pressing the Close Import Window will close
				the modal and bring you back to where you were on the page.'
				onRequestClose={closeModal}
			>
				<ImportForm
					playground={playground!}
					onClose={closeModal}
					onImported={handleImported}
				/>
			</Modal>
		</>
	);
}