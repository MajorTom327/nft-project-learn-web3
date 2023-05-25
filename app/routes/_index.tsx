import type { V2_MetaFunction } from "@remix-run/node";
import { Button, Card, Menu } from "react-daisyui";



import { MintPanel } from "~/components/MintPanel";

import { useProvider } from "~/hooks/useProvider";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const { isConnected, connect, provider, signer } = useProvider();

  return (
    <div className="container mx-auto">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-2xl font-primary">Welcome to the mint</h1>
          </Card.Title>

          {isConnected && provider && <MintPanel provider={signer} />}

          <Card.Actions>
            {!isConnected && (
              <Button onClick={connect}>{"Connect Wallet"}</Button>
            )}
          </Card.Actions>
        </Card.Body>
      </Card>
    </div>
  );
}
