import { configService } from '@services';

import { app } from './app';

const port = configService.port;

app.listen(port, () => {
	console.log(`App started at: ${port}`);
});
