

interface SecondaryBurronProps {
    children: any;
    handleClick: () => void;
}

export default function SecondaryButton(props: SecondaryBurronProps) {
    return <button type="button" className="secondary-button" onClick={props.handleClick}>
      {props.children}
    </button>;
  }