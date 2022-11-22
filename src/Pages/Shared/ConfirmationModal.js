import React from 'react';

const ConfirmationModal = ({cancleModal,handleDelete,deleting}) => {
    return (
        <div>
           


{/* Put this part before </body> tag */}
<input type="checkbox" id="confirmation-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div className="modal-action">
      <label onClick={()=>handleDelete(deleting)} htmlFor="confirmation-modal" className="btn">Yay!</label>
      <button onClick={cancleModal}>Cancel</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ConfirmationModal;