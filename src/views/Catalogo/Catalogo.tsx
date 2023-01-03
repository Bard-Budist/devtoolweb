import * as React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import { InitAWS } from "../../utils/aws";
import {DialogFilter, save, SaveDialogOptions} from '@tauri-apps/api/dialog';

export const DownloadCatalog = () => {
    const Download = async () => {
        InitAWS();
        var getParams = {
            Bucket: 'dev-selecu-builds', // your bucket name,
            Key: 'Catalogo.zip', // path to the object you're looking for
        }
        const filter: DialogFilter = {
            name: "zip",
            extensions: ["zip"]
        }
        const filterMp4: DialogFilter = {
            name: "mp4",
            extensions: ["mp4"]
        }
        const options: SaveDialogOptions = {
            title: "Donde lo quieres guardar?",
            filters: [
                filter, filterMp4
            ]
            
        }
        const pathSave = await save(options);
        //const objectRequest = await s3.getObject(getParams).createReadStream();
        /*s3.getObject(getParams).on('httpData', function (chunk) {
            var read = {
                path: pathSave,
                contents: chunk
            }
            fs.writeBinaryFile(read);
            console.log(chunk.length)
        }).on("httpDone", function () {
        }).on("httpDownloadProgress", function (progress) {
            console.log(progress.loaded);
            console.log(progress.total);
            console.log((progress.total - progress.loaded)/ 100)
        }).on("httpUploadProgress", (progress, response) => {
            console.log(progress)
        })*/

        

         //var params = {Bucket: params.Bucket, Key: params.Key};
            
           /* if (objectRequest.$response.error !== null && objectRequest.Body) {
                 
                var read = {
                    path: pathSave + ".zip",
                    contents: await new Response(objectRequest.Body).arrayBuffer()
                }
                let writeFile = await fs.writeBinaryFile(read);
                console.log(writeFile)
            }
            */
        //console.log(objectRequest)
        
    }
    
    return (
        <>
            <Row>
                <Col>
                    <Card className="text-center">
                    <Card.Body>
                        <Card.Title as="h5">Descarga el Catalogo</Card.Title>
                        <Card.Text>Dale click a Descargar para ver el Catalogo de Selecu</Card.Text>
                        <Button variant="primary"  href="https://dev-colegios-webgl.s3.amazonaws.com/OPT.zip">Descargar</Button>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </>
    );
};
export default DownloadCatalog;
