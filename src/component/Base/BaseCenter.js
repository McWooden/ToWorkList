import { CenterActionButton } from './BaseCenter/CenterActionButton';
import { CardContainer } from './BaseCenter/CardContainer';
export function BaseCenter() {
    return (
        <div className="base-center p-relative of-auto">
            <div className="center d-flex p-relative fd-column">
                <CardContainer/>
                <CenterActionButton/>
            </div>
        </div>
    )
}