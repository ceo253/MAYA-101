import logoUrl from "../../assets/maya-logo.png";

export function MayaLogo(props: { class?: string; size?: number | string }) {
  return (
    <img
      src={logoUrl}
      class={props.class}
      alt="MAYA Chameleon Logo"
      style={{
        "object-fit": "contain",
        width: props.size ? `${props.size}px` : undefined,
        height: props.size ? `${props.size}px` : undefined,
      }}
    />
  );
}

export default MayaLogo;

