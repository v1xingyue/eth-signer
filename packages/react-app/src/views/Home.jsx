import React, { useEffect, useState } from "react";
import { Button, Input, Alert, Card } from "antd";
const { TextArea } = Input;

function Home({ userSigner }) {
  const [msg, setMsg] = useState("");
  const [signedMsg, updateSign] = useState("");
  useEffect(() => {
    (async () => {
      if (userSigner) {
        const parmas = new URLSearchParams(window.location.search);
        if (parmas.has("msg")) {
          setMsg(parmas.get("msg"));
          let signMessage = await userSigner.signMessage(parmas.get("msg"));
          updateSign(signMessage);
        }
      }
    })();
  }, [userSigner]);
  return (
    <Card style={{ textAlign: "left" }}>
      <TextArea
        placeholder="msg"
        value={msg}
        rows={4}
        onChange={e => {
          setMsg(e.target.value);
        }}
      />
      <Button
        type="primary"
        style={{ marginTop: 8, marginLeft: 12 }}
        onClick={async () => {
          let signMessage = await userSigner.signMessage(msg);
          updateSign(signMessage);
        }}
      >
        Sign Content
      </Button>
      <Alert style={{ marginTop: 12 }} message={signedMsg} type="info" />
    </Card>
  );
}

export default Home;
