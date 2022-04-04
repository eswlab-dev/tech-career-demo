import initMondayClient from "monday-sdk-js";
import * as Types from "../constants/Types";

export async function getColumnValue(token, itemId, columnId) {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query{
      items(ids:${itemId}){
        column_values(ids:${columnId}){
          value
        }
      }
    }`;
    // const query = `query($itemId: [Int], $columnId: [String]) {
    //     items (ids: $itemId) {
    //       column_values(ids:$columnId) {
    //         value
    //       }
    //     }
    //   }`;
    // const variables = { columnId, itemId };

    const response = await mondayClient.api(query);
    console.log(`getColumnValue -> response`, response);
    return response.data.items[0].column_values[0].value;
  } catch (err) {
    console.log(err);
  }
}

export async function changeColumnValue(
  token,
  boardId,
  itemId,
  columnId,
  value
) {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = { boardId, columnId, itemId, value };

    const response = await mondayClient.api(query, { variables });
    console.log(`changeColumnValue -> response`, response);
    return response?.data?.change_column_value?.id;
  } catch (err) {
    console.log(err);
  }
}
export async function notify(
  userId: Types.Id,
  itemId: Types.Id,
  transformationType,
  isValid: boolean,
  token: string
) {
  const mondayClient = initMondayClient();
  mondayClient.setToken(token);
  // console.log(`names`, names)
  const message = `The text column ${isValid ? "was" : "wasn't"} transformed ${
    transformationType.title
  }`;
  const mutation = `mutation{
    create_notification (user_id:${userId}, target_id:${itemId}, text:${JSON.stringify(
    message
  )}, target_type: Project){
    text
  }
  }`;
  const res = await mondayClient.api(mutation);
  console.log(`notify->res`, res);
}
