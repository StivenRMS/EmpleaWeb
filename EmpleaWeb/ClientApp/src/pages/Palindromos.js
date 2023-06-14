import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const PalindromeFinder = () => {
    const [inputText, setInputText] = useState('');
    const [palindromes, setPalindromes] = useState([]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const findPalindromes = () => {
        const words = inputText.trim().split(' ');
        const foundPalindromes = [];

        words.forEach(word => {
            const wordLength = word.length;

            for (let i = 0; i < wordLength; i++) {
                for (let j = i + 1; j <= wordLength; j++) {
                    const subWord = word.slice(i, j);
                    const reversedSubWord = subWord.split('').reverse().join('');

                    if (subWord === reversedSubWord && subWord.length > 1) {
                        foundPalindromes.push(subWord);
                    }
                }
            }
        });

        setPalindromes(foundPalindromes);
    };

    return (
        <Container>
            <Row>
                <Col sm={{ size: 6, offset: 3 }}>
                    <Form>
                        <FormGroup>
                            <Label for="inputText">Ingrese un texto:</Label>
                            <Input
                                type="text"
                                name="inputText"
                                id="inputText"
                                value={inputText}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <Button color="primary" onClick={findPalindromes}>Encontrar palíndromos</Button>
                    </Form>
                    <FormGroup>
                        <Label for="palindromeCount">Cantidad de palíndromos:</Label>
                        <Input
                            type="text"
                            name="palindromeCount"
                            id="palindromeCount"
                            value={palindromes.length}
                            disabled={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="palindromeList">Palíndromos encontrados:</Label>
                        <Input
                            type="textarea"
                            name="palindromeList"
                            id="palindromeList"
                            value={palindromes.join(', ')}
                            disabled={true}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default PalindromeFinder;
