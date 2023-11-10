import OBR, { Item } from "@owlbear-rodeo/sdk";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { colors } from "./assets/colors";
import { ReactSVG } from 'react-svg'

const ID = "com.mytracker.initiative";

export const InitiativeList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [openedCharacter, setOpenedCharacter] = useState<string>("");
  const [character, setCharacter] = useState<any>(null);
  const [characterOptionChosen, setCharacterOptionChosen] = useState<number>(-1);
  const [healthAmount, setHealthAmount] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [copied, setCopied] = useState(false);

  const openCharacter = (id: string) => {
    setOpenedCharacter(id);
  }

  const getList = (items: Item[]) => {
    const newItems = items.map((item: any) => {
      const metadata = item.metadata[`${ID}/metadata`];
      if(metadata) {
        return {
          id: metadata.id,
          initiative: metadata.initiative,
          initBonus: metadata.initBonus,
          ac: metadata.ac,
          hpMax: metadata.hpMax,
          hp: metadata.hp,
          hpTemp: metadata.hpTemp,
          melee: metadata.melee,
          range: metadata.range,
          cast: metadata.cast,
          spellDD: metadata.spellDD,
          name: item.name, 
        };
      }
    });
    setItems(newItems.filter((item: any) => item !== undefined).sort((itemA: any, itemB: any) => {
      if(itemB.initiative - itemA.initiative === 0) {
        return itemB.initBonus - itemA.initBonus
      } else {
        return itemB.initiative - itemA.initiative
      }
    }));
  };

  const changeInit = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].initiative = newValue;
      }
    });
    setCharacter({...character, initiative: newValue});
  }

  const changeInitBonus = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].initBonus = newValue;
      }
    });
    setCharacter({...character, initBonus: newValue});
  }

  const changeAC = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].ac = newValue;
      }
    });
    setCharacter({...character, ac: newValue});
  }

  const changeDD = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].spellDD = newValue;
      }
    });
    setCharacter({...character, spellDD: newValue});
  }

  const changeHP = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].hp = newValue;
      }
    });
    setCharacter({...character, hp: newValue});
  }

  const changeMaxHP = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].hpMax = newValue;
      }
    });
    setCharacter({...character, hpMax: newValue});
  }

  const changeTempHP = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].hpTemp = newValue;
      }
    });
    setCharacter({...character, hpTemp: newValue});
  }

  const changeMelee = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].melee = newValue;
      }
    });
    setCharacter({...character, melee: newValue});
  }

  const changeRange = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].range = newValue;
      }
    });
    setCharacter({...character, range: newValue});
  }

  const changeCast = async (event: any) => {
    const newValue = event.target.value;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].cast = newValue;
      }
    });
    setCharacter({...character, cast: newValue});
  }

  const rollInitiative = async () => {
    const result = Math.floor(Math.random() * 20) + 1;
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].initiative = result + +character.initBonus;
      }
    });
    setCharacter({...character, initiative: result + +character.initBonus});
  }

  const takeDamage = async (amount: number) => {
    const onHealth = amount - character.hpTemp;
    if(onHealth >= 0) {
      OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
        for (let item of items) {
          item.metadata[`${ID}/metadata`].hpTemp = 0;
          item.metadata[`${ID}/metadata`].hp= Math.max(character.hp - onHealth, 0);
        }
      });
      setCharacter({...character, hpTemp: 0, hp: Math.max(character.hp - onHealth, 0) });
    } else {
      OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
        for (let item of items) {
          item.metadata[`${ID}/metadata`].hpTemp = character.hpTemp - +amount;
        }
      });
      setCharacter({...character, hpTemp: character.hpTemp - +amount});
    }
  }

  const healDamage = async (amount: number) => {
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].hp = Math.min(character.hp + +amount, character.hpMax);
      }
    });
    setCharacter({...character, hp: Math.min(character.hp + +amount, character.hpMax)});
  }

  const gainShield = async (amount: number) => {
    OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
      for (let item of items) {
        item.metadata[`${ID}/metadata`].hpTemp = character.hpTemp + +amount;
      }
    });
    setCharacter({...character, hpTemp: character.hpTemp + +amount});
  }

  const validateOption = () => {
    switch(characterOptionChosen) {
      case 0:
        takeDamage(healthAmount);
        break;
      case 1:
        healDamage(healthAmount);
        break;
      case 2:
        gainShield(healthAmount);
        break;
    }
    setCharacterOptionChosen(-1);
    setHealthAmount(0);
  }

  const importCharacter = () => {
    const propertiesToImport = ["ac", "cast", "hp", "hpMax", "hpTemp", "initBonus", "initiative", "melee", "range", "spellDD"];
    const imported = window.prompt("Copiez le personnage ici");
    if(imported) {
      try{
        const toImport = JSON.parse(imported);
        let allProperties = true;
        for (let i = 0; i < propertiesToImport.length; i++) {
          if (!toImport.hasOwnProperty(propertiesToImport[i])) {
            allProperties = false;
            break;
          }
        }
        if(allProperties) {
          setCharacter({...toImport, id: character.id, name: character.name});
          OBR.scene.items.updateItems((item) => item.metadata && `${ID}/metadata` in item.metadata && (item.metadata[`${ID}/metadata`] as { id?: any })?.id === character.id, (items) => {
            for (let item of items) {
              item.metadata[`${ID}/metadata`] = {...toImport, id: character.id};
            }
          });
        }
      } catch(err) {
        console.log(err);
      }
    }
  }

  const exportCharacter = () => {
    const toExport = JSON.stringify(character);
    navigator.clipboard.writeText(toExport);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  useEffect(() => {
    setRefresh(false);
    const initializeList = async () => {
      getList(await OBR.scene.items.getItems());
    }
    if(OBR.isReady) {
      if(items.length === 0) {
        initializeList();
      }
      OBR.scene.items.onChange(getList);
    }
  }, [refresh]);

  useEffect(() => {
    if(openedCharacter === "") {
      setCharacter(null);
      setCharacterOptionChosen(-1);
    } else {
      setCharacter(items.find((item) => item.id === openedCharacter));
      setCharacterOptionChosen(-1);
    }
  }, [openedCharacter]);

  if(character !== null) {
    return <CharacterContainer>
      <TopBar>
        <Name onClick={() => setOpenedCharacter("")}><ReactSVG src='/icons/back.svg' beforeInjection={(svg) => {svg.setAttribute('style', 'width: 20px; height: 20px; margin-top: 4px;')}}/></Name>
        <div style={{display: 'flex', flexDirection: "row", gap: '12px'}}>
          <Name title="Importer un personnage" onClick={importCharacter}><ReactSVG src='/icons/import.svg' beforeInjection={(svg) => {svg.setAttribute('style', 'width: 20px; height: 20px; margin-top: 4px;')}}/></Name>
          <Name title="Exporter le personnage" onClick={exportCharacter}><ReactSVG src='/icons/export.svg' beforeInjection={(svg) => {svg.setAttribute('style', 'width: 20px; height: 20px; margin-top: 4px;')}}/></Name>
        </div>
      </TopBar>
      {copied && <TempModal>Personnage copié !</TempModal>}
      <Title>{character.name}</Title>
      <div style = {{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
      <SubTitle style={{width: '100%', justifyContent: 'center'}}>Classe d'armure</SubTitle>
      <SubTitle style={{width: '100%', justifyContent: 'center'}}>DD de sort</SubTitle>
      <Value>
        <NumberValue value={character.ac} onChange={changeAC}/>
      </Value>
      <Value>
        <NumberValue value={character.spellDD} onChange={changeDD}/>
      </Value>
      </div>
      <SubTitle>Initiative</SubTitle>
      <StatInit>
        <Value>Score</Value>
        <Value>Bonus</Value>
        <Value></Value>
        <Value>
          <NumberValue value={character.initiative} onChange={changeInit}/>
        </Value>
        <Value>
          <NumberValue value={character.initBonus} onChange={changeInitBonus}/>
        </Value>
        <Button $color="transparent" title="Lancer l'initiative" onClick={rollInitiative}>
          <ReactSVG src="/icons/dice.svg" beforeInjection={(svg) => {svg.setAttribute('style', 'width: 22px; height: 22px; margin-top: 4px;')}}/>
          Lancer
        </Button>
      </StatInit>
      <SubTitle>Bonus d'attaque</SubTitle>
      <StatInit>
        <Value>Mêlée</Value>
        <Value>Distance</Value>
        <Value>Sort</Value>
        <Value>
          <NumberValue value={character.melee} onChange={changeMelee}/>
        </Value>
        <Value>
          <NumberValue value={character.range} onChange={changeRange}/>
        </Value>
        <Value>
          <NumberValue value={character.cast} onChange={changeCast}/>
        </Value>
      </StatInit>
      <SubTitle>Santé</SubTitle>
      <StatPV>
      <Value>PV</Value>
      <Value>PV max</Value>
      <Value>PV temp.</Value>
      <Value>
        <NumberValue value={character.hp} onChange={changeHP}/>
      </Value>
      <Value>
        <NumberValue value={character.hpMax} onChange={changeMaxHP}/>
      </Value>
      <Value>
        <NumberValue value={character.hpTemp} onChange={changeTempHP}/>
      </Value>
        <Button onClick={() => setCharacterOptionChosen(0)} $color={colors.red} title="Subir des dégâts"><ReactSVG src="/icons/sword.svg" beforeInjection={(svg) => {svg.setAttribute('style', 'width: 22px; height: 22px; margin-top: 4px;')}}/></Button>
        <Button onClick={() => setCharacterOptionChosen(1)} $color={colors.green} title="Se soigner"><ReactSVG src="/icons/heal.svg" beforeInjection={(svg) => {svg.setAttribute('style', 'width: 22px; height: 22px; margin-top: 4px;')}}/></Button>
        <Button onClick={() => setCharacterOptionChosen(2)} $color={colors.blue} title="Gagner des PV temporaires"><ReactSVG src="/icons/shield.svg" beforeInjection={(svg) => {svg.setAttribute('style', 'width: 22px; height: 22px; margin-top: 4px;')}}/></Button>
      </StatPV>

      {characterOptionChosen !== -1 && <SubTitle>{characterOptionChosen === 0 ? "Subir des dégâts" : characterOptionChosen === 1 ? "Se soigner" : "Gagner des PV temporaires"}</SubTitle>}
      {characterOptionChosen !== -1 && <StatPV>
        <Value>Montant</Value>
        <Value>Valider</Value>
        <Value>Annuler</Value>
        <Value>
          <NumberValue value={healthAmount} onChange={(event: any) => setHealthAmount(event.target.value)}/>
        </Value>
        <Button onClick={validateOption} $color={colors.green} title="Valider"><ReactSVG src="/icons/validate.svg" beforeInjection={(svg) => {svg.setAttribute('style', 'width: 22px; height: 22px; margin-top: 4px;')}}/></Button>
        <Button onClick={() => {
          setHealthAmount(0);
          setCharacterOptionChosen(-1);
        }} $color={colors.red} title="Annuler"><ReactSVG src="/icons/cancel.svg" beforeInjection={(svg) => {svg.setAttribute('style', 'width: 22px; height: 22px; margin-top: 4px;')}}/></Button>
      </StatPV>}
    </CharacterContainer>
  }

  return <ListContainer>
    <ReactSVG onClick={() => setRefresh(true)} src="/icons/refresh.svg" beforeInjection={(svg) => {svg.setAttribute('style', 'width: 22px; height: 22px; margin-top: 4px;')}}/>
    <Title>Ordre d'Initiative</Title>
    <ItemContainer key="-1">
      <Name style={{cursor: 'auto'}}>Nom</Name>
      <Value>CA</Value>
      <Value>DD</Value>
      <Value>Init.</Value>
    </ItemContainer>
    {items.map((item, id) => <ItemContainer key={id}>
      <Name onClick={() => openCharacter(item.id)}>{item.name}</Name>
      <Value>{item.ac}</Value>
      <Value>{item.spellDD}</Value>
      <Value>{item.initiative}</Value>
    </ItemContainer>
  )}
  <Credits>By Kerokan and Shysalia</Credits>
  </ListContainer>
}

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 2px;
`;

const TempModal = styled.div`
  display: flex;
  position: absolute;

  padding: 8px 16px;

  background-color: rgba(255,255,255,0.1);
  white-space: nowrap;
  border-radius: 20px;
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: left;
  font-size: 18px;
  margin-bottom: 12px;
  margin-top: 24px;
`;

const StatInit = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 6px;
  align-items: center;
  justify-content: center;
`;

const StatPV = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 6px;
  align-items: center;
  justify-content: center;
`;

const ListContainer = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
`;

const CharacterContainer = styled.div`
  width: 100%;
  position: relative;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  padding: 10px 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
`;

const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  cursor: pointer;
`;

const Button = styled.div<{$color: string}>`
  width: fit-content;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  background-color: ${props => props.$color};
  border: solid 1px ${colors.white};
  border-radius: 6px;
  padding: 0px 10px;

  justify-self: center;
`;

const NumberValue = styled.input`
  width: 40px;
  height: 26px;
  display: flex;
  background-color: transparent;
  color: ${colors.white};
  border: solid 1px ${colors.black};
  border-radius: 6px;
  text-align: center;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Credits = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  white-space: nowrap;
  color: ${colors.black};
  font-size: 10px;
`;
