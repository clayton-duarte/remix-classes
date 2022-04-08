// import faunadb, {
//   Collection,
//   Documents,
//   Paginate,
//   Select,
//   Lambda,
//   Match,
//   Index,
//   Var,
//   Map,
//   Get,
//   Create,
//   // Let,
//   // Ref,
// } from "faunadb";
// import { json, useParams, useLoaderData, redirect } from "remix";
import { Link } from "remix";

// import { characterAbilityGlossary } from "~/helpers/types";

// export const loader = () => {
//   // const formatted = Object.values(characterAbilityGlossary);

//   // const client = new faunadb.Client({
//   //   secret: process.env.FAUNA_ADMIN_KEY ?? "",
//   //   keepAlive: false,
//   // });

//   // client.query(
//   //   Map(
//   //     formatted,
//   //     Lambda(
//   //       "data",
//   //       Create(Collection("character_abilities"), { data: Var("data") })
//   //     )
//   //   )
//   // );

//   // console.log(">>>>>>>>>>>>>>>>>>>>>", formatted);

//   return json({});
// };

export default function HomePage() {
  return (
    <>
      <Link to="/builder">builder</Link>
    </>
  );
}
