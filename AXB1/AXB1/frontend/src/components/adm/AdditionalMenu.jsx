import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

export default function AdditionalMenu(props){
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options">
                {props.tabs.map((t, i) => {
                    return(
                        <Tab key={i} title={t.title}>
                            <Card>
                                <CardBody>
                                </CardBody>
                            </Card>
                        </Tab>
                    )
                })}
            </Tabs>
        </div>  
  )
}

