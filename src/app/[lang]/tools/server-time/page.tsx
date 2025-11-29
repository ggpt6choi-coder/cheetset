import React from 'react';
import { Metadata } from 'next';
import ServerTimeClient from './ServerTimeClient';

export const metadata: Metadata = {
    title: '서버 시간 확인 - 티켓팅, 수강신청 필수 시계 | CheatKey',
    description: '인터파크, 예스24, 멜론티켓, 수강신청 등 원하는 사이트의 정확한 서버 시간을 0.1초 단위로 확인하세요. 네이비즘보다 빠르고 정확한 서버 시간 확인.',
    keywords: ['서버시간', '서버시간확인', '티켓팅시계', '수강신청시계', '네이비즘', '서버시계', '인터파크서버시간', '멜론티켓서버시간'],
    openGraph: {
        title: '서버 시간 확인 - 티켓팅, 수강신청 필수 시계',
        description: '원하는 사이트의 정확한 서버 시간을 확인하세요. 티켓팅, 수강신청 성공을 위한 필수 도구.',
        type: 'website',
    },
};

export default function ServerTimePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <ServerTimeClient />

            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-blue max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2>서버 시간이란 무엇인가요?</h2>
                    <p>
                        우리가 평소에 보는 시계(핸드폰, 컴퓨터 시계)와 웹사이트를 운영하는 서버의 시간은 미세하게 다를 수 있습니다.
                        이를 <strong>서버 시간(Server Time)</strong>이라고 합니다.
                    </p>
                    <p>
                        인기 있는 콘서트 티켓팅이나 대학교 수강신청처럼 <strong>0.1초의 차이로 성공과 실패가 갈리는 상황</strong>에서는
                        내 컴퓨터의 시간이 아닌, 해당 사이트 서버의 정확한 시간을 아는 것이 매우 중요합니다.
                    </p>

                    <h3>왜 서버 시간을 확인해야 하나요?</h3>
                    <ul>
                        <li>
                            <strong>티켓팅 (인터파크, 멜론티켓, 예스24 등):</strong> 예매 버튼이 활성화되는 정확한 시점을 알기 위해 필요합니다.
                        </li>
                        <li>
                            <strong>수강신청:</strong> 인기 강의를 선점하기 위해 서버 기준 정각에 클릭해야 합니다.
                        </li>
                        <li>
                            <strong>선착순 이벤트:</strong> 각종 쇼핑몰이나 관공서의 선착순 마감 이벤트에 유리합니다.
                        </li>
                    </ul>

                    <h3>티켓팅 성공 꿀팁 3가지</h3>
                    <ol>
                        <li>
                            <strong>정확한 서버 시간 확인:</strong> 본 도구를 사용하여 58초, 59초, 00초의 흐름을 정확히 파악하세요.
                        </li>
                        <li>
                            <strong>미리 로그인 및 세팅:</strong> 예매 시작 10분 전에는 로그인을 완료하고, 결제 수단 등을 미리 확인해두세요.
                        </li>
                        <li>
                            <strong>새로고침 타이밍:</strong> 사이트마다 다르지만, 보통 59초에서 00초로 넘어가는 순간 새로고침을 하거나 예매 버튼을 클릭하는 것이 좋습니다.
                        </li>
                    </ol>

                    <div className="bg-blue-50 p-4 rounded-lg not-prose mt-8">
                        <p className="text-sm text-blue-800 font-medium text-center">
                            CheatKey의 서버 시간 확인 도구는 여러분의 소중한 기회를 잡을 수 있도록<br />
                            가장 정확한 시간을 제공하기 위해 노력합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
