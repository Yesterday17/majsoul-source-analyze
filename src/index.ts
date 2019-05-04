import * as UI_PlayerNote from "./uiscript/UI_PlayerNote";
import * as UI_PlayerTitle from "./uiscript/UI_PlayerTitle";
import * as UI_Money from "./uiscript/UI_Money";
import * as UI_Mail from "./uiscript/UI_Mail";
import * as UI_Level from "./uiscript/UI_Level";
import * as UI_Item_Skin from "./uiscript/UI_Item_Skin";
import * as UI_Head from "./uiscript/UI_Head";
import * as UI_Character_Skin from "./uiscript/UI_Character_Skin";
import * as UI_Character_Emo from "./uiscript/UI_Character_Emo";

const uiscript = {};
const uiscripts = [
  UI_PlayerNote,
  UI_PlayerTitle,
  UI_Money,
  UI_Mail,
  UI_Level,
  UI_Item_Skin,
  UI_Head,
  UI_Character_Skin,
  UI_Character_Emo
];

uiscripts.forEach(script => script.default(uiscript));
