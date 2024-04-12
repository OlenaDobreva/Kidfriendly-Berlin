import Image from "next/image";
import Link from "next/link.js";

export default function Card({ name, rating, address, type, image, mapURL }) {
  return (
    <div>
      <h3>{name}</h3>
      <Image
        src={image}
        alt="kidfriendly place"
        width={160}
        height={140}
      ></Image>
      <p>Rating: {rating}⭐ from 5</p>
      <p>Address: {address}</p>
      <p>Type: {type}</p>
      <Link href={mapURL}>Google Map Link</Link>
    </div>
  );
}
