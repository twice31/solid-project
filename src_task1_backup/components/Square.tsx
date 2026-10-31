interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

export default function Square(props: SquareProps) {
  return (
    <button class="square" onClick={() => props.onSquareClick()}>
      {props.value}
    </button>
  );
}
