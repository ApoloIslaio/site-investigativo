import { gql } from "@apollo/client";

// 
export const CREATE_SCAMMER = gql`
  mutation (
      $ip: String!, 
      $image: String!, 
      $active: Boolean!, 
      $localization: String!, 
      $link_token_id: Int!
    ) {
    createScammer(input: {
        ip: $ip,
        details: $image,
        active: $active,
        linkTokenId: $link_token_id,
        localization: $localization,
    }) 
    {
      scammer {
        id,
        ip,
        localization
		  }
    }
  }
`