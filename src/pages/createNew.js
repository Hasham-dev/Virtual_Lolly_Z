import { useMutation, useQuery } from "@apollo/client";
import { navigate } from "gatsby";
import gql from 'graphql-tag';
import React, { useRef, useState, useEffect } from "react"
import ReactDOM from 'react-dom'
//import Lolly from '../svgs/lolly-image.svg'
import Header from '../components/Header'
import Lolly from '../components/Lolly'

const GET_LOLLY = gql`
{
    getLolly {
        message,
        senderName
    }
}
`
const createLollyMutation = gql`
    mutation createLolly($recipientName:String!, $message: String!, $senderName: String!,$flavourTop: String!,$flavourMiddle: String!,$flavourBottom: String!) {
        createLolly(recipientName: $recipientName, message: $message, senderName: $senderName,flavourTop: $flavourTop, flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom){
            recipientName
            message
            senderName
            flavourTop
            flavourMiddle
            flavourBottom
            lollyPath
        }
    }
`;

export default function NewLolly() {
    const [color1, setColor1] = useState("#d52358");
    const [color2, setColor2] = useState("#e95946");
    const [color3, setColor3] = useState("#deaa43");
    const recipientNameRef = useRef();
    const messageRef = useRef();
    const senderNameRef = useRef();
    //const {loading,error, data} = useQuery(GET_LOLLY);
    //console.log(data);
    const [createLolly, { data }] = useMutation(createLollyMutation);
    const createLollySubmit = async () => {
        console.log("recipientNameRef = ", recipientNameRef.current.value);
        const result = await createLolly({
            variables: {
                recipientName: recipientNameRef.current.value,
                message: messageRef.current.value,
                senderName: senderNameRef.current.value,
                flavourTop: color1,
                flavourMiddle: color2,
                flavourBottom: color3
            }
        })
        console.log("result = ", result.data.createLolly);
        navigate(`/showLolly?id=${result.data.createLolly.lollyPath}`);


    }
    useEffect(() => {
        async function runHook() {
            const response = await fetch("https://api.netlify.com/build_hooks/5fa73211f2e549030b792c77", {
                method: "POST",
            });

        }
        runHook();

    }, [data])
    return (

        <div className="container">
            <Header />
            <div className="newLollyForm">
                <div className="Lol">
                    <Lolly lollyTopFill={color1} lollyMiddleFill={color2} lollyBottomFill={color3} />
                </div>
                <div className="lollyFlavourDiv">
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input type="color" value={color1} className="colorPicker" name="flavourTop" id="flavourTop"
                            onChange={(e) => {
                                setColor1(e.target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input type="color" value={color2} className="colorPicker" name="flavourTop" id="flavourTop"
                            onChange={(e) => {
                                setColor2(e.target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input type="color" value={color3} className="colorPicker" name="flavourTop" id="flavourTop"
                            onChange={(e) => {
                                setColor3(e.target.value);
                            }}
                        />
                    </label>

                </div>
                <div >
                    <div className="form-container">
                        <div style={{ margin: "20px" }}>
                            <label htmlFor="recipientName" style={{ display: "block", }}>To</label>
                            <input name="recipientName" id="recipientName" ref={recipientNameRef} />
                        </div>
                        <div style={{ margin: "20px" }}>
                            <label htmlFor="message" style={{ display: "block", }}>Say something nice</label>
                            <textarea cols="30" rows="10" name="message" id="message" ref={messageRef} />
                        </div>
                        <div style={{ margin: "20px" }}>
                            <label htmlFor="senderName" style={{ display: "block", }}>From</label>
                            <input name="senderName" id="senderName" ref={senderNameRef} />
                        </div>
                    </div>
                <button onClick={createLollySubmit}>Freeze this lolly & get the Link</button>
                </div>
            </div>
        </div>

    )
}
