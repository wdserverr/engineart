import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class TipButton extends Component {
  state = {
    modalOpen: false,
    amount: "0"
  }

  // Open and close the modal
  toggleModal = () => this.setState(state => ({
    modalOpen: !state.modalOpen
  }))

  // Update the amount of Near to send
  updateAmount = amount => this.setState({ amount: amount.toString() });

  render() {
    const {
      receiver,
      sendNear
    } = this.props;
    const {
      amount,
      modalOpen
    } = this.state;

    return (
      <>
        <button
          onClick={this.toggleModal}
        >
          MINT
        </button>
        <Modal
          className="center"
          size="md"
          centered
          show={modalOpen}
          onHide={this.toggleModal}
        >
          <Modal.Header className="d-flex">
            <h5 className="mb-0">
              MINT: <span className="fw-bolder">Engineart NFT</span>
            </h5>

            <button className="bg-white border-0 text-muted" onClick={this.toggleModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-4">Select the amount of NFT to Mint.</p>

            {/* Select how much Near to send */}
            <button onClick={() => this.updateAmount(7)} className="1" style={{ width: "60px", height: "60px" }}>
              1
            </button>
            <button onClick={() => this.updateAmount(14)} className="3" style={{ width: "60px", height: "60px" }}>
              2
            </button>
            <button onClick={() => this.updateAmount(7*4)} className="5" style={{ width: "60px", height: "60px" }}>
              4
            </button>

            {/* Call the sendNear method */}
            <button
              onClick={() => sendNear(amount, receiver)}
              disabled={amount === "0"}
              className="btnmnt"
            >
              Mint {amount} Near
            </button>
          </Modal.Body>
        </Modal>
        <div>
        </div>
      </>
    );
  }
}

export default TipButton;
