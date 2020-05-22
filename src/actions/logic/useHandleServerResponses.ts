import { ServerPaoResponses, PaoResponses } from "../paoActions"
import { FAILED_SERVER_CRUD_REQUEST, CREATED_NEW_PAO_DOC } from "../types"
import { useDispatch } from "react-redux"

export const handle_update_and_create_pao_doc_server_responses = ({
  fetchedData, paoListApprovedByServer }: { fetchedData, paoListApprovedByServer }) => (dispatch) => {

    (() => {
      switch (fetchedData.message) {
        case ServerPaoResponses.saved_updated_document: return
        case ServerPaoResponses.pushed_new_doc_and_saved_successfully:
          dispatch({ type: CREATED_NEW_PAO_DOC, payload: fetchedData.document })
          return


        case ServerPaoResponses.token_invalid:
        case ServerPaoResponses.save_pao_item_failed:
        case ServerPaoResponses.doc_by_num_exists:
          dispatch({ type: FAILED_SERVER_CRUD_REQUEST, payload: paoListApprovedByServer })
          return

        default:
          break;
      }
    })();

    return (() => {
      switch (fetchedData.message) {
        //success
        case ServerPaoResponses.saved_updated_document:
          return PaoResponses.saved_updated_document
        case ServerPaoResponses.pushed_new_doc_and_saved_successfully:
          return PaoResponses.pushed_new_doc_and_saved_successfully


        //failed
        case ServerPaoResponses.token_invalid:
          return PaoResponses.token_invalid
        case ServerPaoResponses.save_pao_item_failed:
          return PaoResponses.save_pao_item_failed
        case ServerPaoResponses.doc_by_num_exists:
          return PaoResponses.doc_by_num_exists

        default:
          break;
      }
    })();
  }
