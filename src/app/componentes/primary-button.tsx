import React from 'react';

interface PrimaryButtonProps {
  children: string;
  handleClick: () => void;
} 

export default function PrimaryButton(props: PrimaryButtonProps) {
  return <button type="button" className="primary-button" onClick={props.handleClick}>
  {props.children}
  </button>;
}


