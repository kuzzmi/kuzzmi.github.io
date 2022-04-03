import React from 'react';
import fs from 'fs';
import { Converter } from 'showdown';

export function getStaticProps() {
    const files = fs.readdirSync('../posts');
    const posts = files.map((file) => {
        const service = file.slice(0, file.indexOf('.md'));
        const content = fs.readFileSync(`../posts/${service}.md`, 'utf8');
        const converter = new Converter({ metadata: true });
        converter.makeHtml(content);
        const meta = converter.getMetadata();
        const { title } = meta;
        return {
            slug: service,
            title,
        };
    });
    return {
        props: {
            posts,
        },
    };
}
