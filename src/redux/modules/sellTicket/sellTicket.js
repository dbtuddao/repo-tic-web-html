const CLEAR = 'tix/sellTicket/CLEAR';
const FROM_EVENT = 'tix/sellTicket/FROM_EVENT';
const UPDATE_SELL_TICKET = 'tix/sellTicket/UPDATE_SELL_TICKET';
const NEW_WIZARD = 'tix/sellTicket/NEW_WIZARD';
const SAVE_EVENT = 'tix/sellTicket/SAVE_EVENT';
const CHANGE_EVENT = 'tix/sellTicket/CHANGE_EVENT';
const SAVE_TICKETYPE = 'tix/sellTicket/SAVE_TICKETYPE';
const CHANGE_TICKETYPE = 'tix/sellTicket/CHANGE_TICKETYPE';

const UPLOAD = 'tix/sellTicket/UPLOAD';
const UPLOAD_SUCCESS = 'tix/sellTicket/UPLOAD_SUCCESS';
const UPLOAD_FAIL = 'tix/sellTicket/UPLOAD_FAIL';
const UPLOAD_PROGRESS = 'tix/sellTicket/UPLOAD_PROGRESS';
const DELETE_UPLOAD_PROGRESS = 'tix/sellTicket/DELETE_UPLOAD_PROGRESS';
const DELETE_TICKET = 'tix/sellTicket/DELETE_TICKET';
const CHANGE_TICKET_ENTRANCE = 'tix/sellTicket/CHANGE_TICKET_ENTRANCE';
const CHANGE_TICKET_SALE = 'tix/sellTicket/CHANGE_TICKET_SALE';

const SAVE_TICKET = 'tix/sellTicket/SAVE_TICKET';

const SAVE_PERSONAL = 'tix/sellTicket/SAVE_PERSONAL';

const SAVE_PROMOTION = 'tix/sellTicket/SAVE_PROMOTION';

const SAVE_SELLTICKET = 'tix/sellTicket/SAVE_SELLTICKET';
const SAVE_SELLTICKET_SUCCESS = 'tix/sellTicket/SAVE_SELLTICKET_SUCCESS';
const SAVE_SELLTICKET_FAIL = 'tix/sellTicket/SAVE_SELLTICKET_FAIL';

const initialState = {
  loaded: false,
  fromEvent: null,
  uploadProgress: null
};

export default (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CLEAR:
      return {
        ...initialState
      };
    case FROM_EVENT:
      return {
        ...state,
        fromEvent: action.payload
      };
    case NEW_WIZARD:
      if (state.fromEvent) {
        action.payload.event = Object.assign({}, state.fromEvent);
        action.payload.step = 1;
      }

      return {
        ...state,
        data: action.payload
      };
    case UPDATE_SELL_TICKET:
      return {
        ...state,
        data: action.payload
      };
    case SAVE_EVENT:
      return {
        ...state,
        data: {
          ...state.data,
          event: action.payload,
          ticketType: null
        }
      };
    case CHANGE_EVENT:
      return {
        ...state,
        data: {
          ...state.data,
          event: null,
          ticketType: null
        }
      };
    case SAVE_TICKETYPE:
      return {
        ...state,
        data: {
          ...state.data,
          ticketType: action.payload
        }
      };
    case CHANGE_TICKETYPE:
      return {
        ...state,
        data: {
          ...state.data,
          ticketType: null
        }
      };
    case SAVE_TICKET:
      return {
        ...state,
        data: {
          ...state.data,
          step: 3,
          ticket: action.payload
        }
      };
    case SAVE_PERSONAL:
      return {
        ...state,
        data: {
          ...state.data,
          step: 4,
          personal: action.payload
        }
      };
    case UPLOAD:
      return {
        ...state
      };
    case UPLOAD_SUCCESS:
      // check dupplicate codes
      for (const key in state.data.upload) {
        if (state.data.upload.hasOwnProperty(key)) {
          for (let i = 0; i < state.data.upload[key].uploads.length; i++) {
            for (let j = 0; j < action.payload.uploads.length; j++) {
              if (state.data.upload[key].uploads[i].codes !== '' && state.data.upload[key].uploads[i].codes === action.payload.uploads[j].codes) {
                return {
                  ...state,
                  uploadError: { message: 'Some of ticket is duplicate' }
                };
              }
            }
          }
        }
      }

      newState = {
        ...state,
        uploadError: null,
        data: {
          ...state.data,
          upload: {
            ...state.data.upload,
            [action.payload.ref]: {
              uploads: action.payload.uploads,
              name: action.payload.name,
              bundle: action.payload.bundle
            }
          }
        }
      };

      // create entrance and sale
      for (let i = 0; i < newState.data.upload[action.payload.ref].uploads.length; i++) {
        if (newState.data.upload[action.payload.ref].uploads[i].codes !== '') {
          newState.data.upload[action.payload.ref].uploads[i].entrance = true;
          newState.data.upload[action.payload.ref].uploads[i].sale = true;
        }
      }
      return newState;
    case UPLOAD_FAIL:
      return {
        ...state,
        uploadError: action.error
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          [action.payload.ref]: action.payload
        }
      };
    case DELETE_UPLOAD_PROGRESS:
      newState = {
        ...state
      };

      delete newState.uploadProgress[action.payload.ref];
      return newState;
    case DELETE_TICKET:
      newState = {
        ...state
      };

      delete newState.data.upload[action.payload.ref];
      return newState;
    case CHANGE_TICKET_ENTRANCE:
      newState = {
        ...state
      };

      for (let i = 0; i < newState.data.upload[action.payload.ref].uploads.length; i++) {
        if (newState.data.upload[action.payload.ref].uploads[i].id === action.payload.id) {
          newState.data.upload[action.payload.ref].uploads[i].entrance = action.payload.val;
          break;
        }
      }

      return newState;
    case CHANGE_TICKET_SALE:
      newState = {
        ...state
      };

      for (let i = 0; i < newState.data.upload[action.payload.ref].uploads.length; i++) {
        if (newState.data.upload[action.payload.ref].uploads[i].id === action.payload.id) {
          newState.data.upload[action.payload.ref].uploads[i].sale = action.payload.val;
          break;
        }
      }

      return newState;
    case SAVE_PROMOTION:
      return {
        ...state,
        data: {
          ...state.data,
          step: 5,
          promotion: action.payload
        }
      };
    case SAVE_SELLTICKET:
      return state;
    case SAVE_SELLTICKET_SUCCESS:
      // return {
      //   ...initialState
      // };
      return state;
    case SAVE_SELLTICKET_FAIL:
      return {
        ...state,
        saved: false,
        saveError: action.error
      };
    default:
      return state;
  }
};

export function updateSellTicket(data) {
  return {
    type: UPDATE_SELL_TICKET,
    payload: data
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}

export function newWizard() {
  const init = {
    step: 1,
    event: null,
    ticketType: null,
    upload: null,
    ticket: null,
    personal: null,
    promotion: null
  };

  const data = Object.assign({}, init);

  return {
    type: NEW_WIZARD,
    payload: data
  };
}

export function fromEvent(event) {
  return {
    type: FROM_EVENT,
    payload: event
  };
}

export function saveEvent(event) {
  return {
    type: SAVE_EVENT,
    payload: event
  };
}

export function changeEvent() {
  return {
    type: CHANGE_EVENT
  };
}

export function saveTicketType(ticketType) {
  return {
    type: SAVE_TICKETYPE,
    payload: ticketType
  };
}

export function changeTicketType() {
  return {
    type: CHANGE_TICKETYPE
  };
}

export function saveTicket(ticketForm) {
  return {
    type: SAVE_TICKET,
    payload: {
      ...ticketForm
    }
  };
}

export function savePersonal(personal) {
  return {
    type: SAVE_PERSONAL,
    payload: personal
  };
}

export function savePromotion(promotion) {
  return {
    type: SAVE_PROMOTION,
    payload: {
      emails: promotion.emails,
      fbwall: promotion.fbwall ? promotion.fbwall : false,
      fbevent: promotion.fbevent ? promotion.fbevent : false
    }
  };
}

export function updateProgress(progress, ref, name) {
  return {
    type: UPLOAD_PROGRESS,
    payload: { progress, ref, name }
  };
}

export function deleteProgress(ref) {
  return {
    type: DELETE_UPLOAD_PROGRESS,
    payload: { ref }
  };
}

export function uploadFile(authToken, file, ref, progress) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/Upload/Upload', {
      auth: authToken,
      attach: { file },
      field: { ref },
      progress
    })
  };
}

export function deleteTickets(ref) {
  return {
    type: DELETE_TICKET,
    payload: { ref }
  };
}

export function changeTicetEntrance(ref, id, val) {
  return {
    type: CHANGE_TICKET_ENTRANCE,
    payload: { id, ref, val }
  };
}

export function changeTicketSale(ref, id, val) {
  return {
    type: CHANGE_TICKET_SALE,
    payload: { id, ref, val }
  };
}

export function saveSellTicket(sellTicket, userId) {
  const uploads = [];
  for (const key in sellTicket.data.upload) {
    if (sellTicket.data.upload.hasOwnProperty(key)) {
      for (let i = 0; i < sellTicket.data.upload[key].uploads.length; i++) {
        uploads.push({
          id: sellTicket.data.upload[key].uploads[i].id,
          bundle: sellTicket.data.upload[key].uploads[i].bundle,
          entrance: sellTicket.data.upload[key].uploads[i].entrance || false,
          sale: sellTicket.data.upload[key].uploads[i].sale || false,
          codes: sellTicket.data.upload[key].uploads[i].codes || '',
          sourceName: sellTicket.data.upload[key].name
        });
      }
    }
  }

  const data = {
    userID: userId,
    eventID: sellTicket.data.event.id,
    ticketTypeID: sellTicket.data.ticketType.id,
    ticketPrice: sellTicket.data.ticket.price,
    ticketOriginalPrice: sellTicket.data.ticket.originalPrice,
    ticketGetPrice: sellTicket.data.ticket.getPrice,
    ticketDescription: sellTicket.data.ticket.description,
    ticketRow: sellTicket.data.ticket.row || '',
    ticketBlock: sellTicket.data.ticket.block || '',
    personalName: sellTicket.data.personal.name,
    personalEmail: sellTicket.data.personal.email,
    personalCountry: sellTicket.data.personal.country,
    promotionFbWall: sellTicket.data.promotion.fbwall,
    promotionFbEvent: sellTicket.data.promotion.fbevent,
    promotionEmails: sellTicket.data.promotion.emails || '',
    uploads: uploads
  };

  return {
    types: [SAVE_SELLTICKET, SAVE_SELLTICKET_SUCCESS, SAVE_SELLTICKET_FAIL],
    promise: (client) => client.post('/EventAds/CreateByOwner', {
      data: data
    })
  };
}
