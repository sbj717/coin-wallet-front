import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

function QRCodeCard({ address }) {
  return <QRCodeSVG value={address} />;
}

export default QRCodeCard;
