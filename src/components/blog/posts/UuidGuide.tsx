import React from 'react';

export default function UuidGuide({ lang }: { lang: string }) {
    return (
        <article className="prose dark:prose-invert max-w-none">
            <p className="lead">
                개발자라면 데이터베이스 설계를 하거나 API를 만들 때 'UUID'라는 용어를 한 번쯤 들어보셨을 겁니다.
                특히 분산 시스템 환경에서 고유 식별자가 필요할 때 UUID는 표준처럼 사용됩니다.
            </p>

            <h2>1. UUID란 무엇인가?</h2>
            <p>
                UUID(Universally Unique Identifier)는 '범용 고유 식별자'의 약자로, 네트워크 상에서 고유성이 보장되는 ID를 만들기 위한 표준 규약입니다.
                128비트의 숫자로 구성되며, 보통 32자리의 16진수 문자열로 표현됩니다. (예: <code>550e8400-e29b-41d4-a716-446655440000</code>)
            </p>

            <h2>2. 왜 Auto Increment 대신 UUID를 쓸까?</h2>
            <ul>
                <li><strong>고유성 보장:</strong> 중앙 서버 없이도 ID를 생성할 수 있어 분산 시스템에 적합합니다.</li>
                <li><strong>보안:</strong> 순차적인 ID(1, 2, 3...)는 다음 ID를 예측하기 쉽지만, UUID는 예측이 불가능합니다.</li>
                <li><strong>병합 용이성:</strong> 여러 데이터베이스의 데이터를 합칠 때 ID 충돌 걱정이 없습니다.</li>
            </ul>

            <h2>3. UUID 버전별 차이점</h2>
            <ul>
                <li><strong>v1:</strong> 타임스탬프와 MAC 주소 기반. 생성 순서가 보장되지만, MAC 주소 노출로 보안 이슈가 있을 수 있습니다.</li>
                <li><strong>v4:</strong> 완전 랜덤 기반. 가장 널리 사용되며 충돌 확률이 극히 낮습니다. (치트셋 생성기가 사용하는 방식)</li>
                <li><strong>v5:</strong> 이름(Name) 기반. 특정 입력값에 대해 항상 같은 UUID가 생성됩니다.</li>
            </ul>

            <h2>4. 언제 UUID v4를 써야 할까?</h2>
            <p>
                대부분의 웹 애플리케이션, 특히 사용자 세션 ID, 트랜잭션 ID, 파일명 등을 생성할 때 <strong>UUID v4</strong>가 가장 적합합니다.
                충돌 확률은 로또 1등에 수십 번 연속 당첨될 확률보다 낮으므로 안심하고 사용셔도 됩니다.
            </p>

            <p>
                지금 바로 <a href="/ko/tools/uuid-generator">UUID 생성기</a>를 통해 안전한 식별자를 만들어보세요.
            </p>
        </article>
    );
}
