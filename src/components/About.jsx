import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-num reveal">§ 02 / About</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '.1s' }}>關於我</h2>
          </div>
          <div className="section-meta reveal" style={{ transitionDelay: '.2s' }}>
            Bio / Long-form<br />三段 · 三個次標
          </div>
        </div>

        {/* 策略 × 創意 × 執行力 移至此 */}
        <h3 className="about-bigtitle reveal">
          策略 <span className="x-mark">×</span> 創意 <span className="x-mark">×</span> 執行力
        </h3>

        <div className="about-grid">
          <aside className="about-aside reveal">
            <div>
              <div className="k">Based in</div>
              <div className="v">[ 待填入：城市名稱 ]</div>
            </div>
            <div>
              <div className="k">Working since</div>
              <div className="v">[ 待填入：年份 ] — Present</div>
            </div>
            <div>
              <div className="k">Languages</div>
              <div className="v">[ 待填入：語言與程度 ]</div>
            </div>
            <div>
              <div className="k">Currently</div>
              <div className="v">
                <span className="live-dot" />
                [ 待填入：接案狀態 ] · Q2 2026
              </div>
            </div>
            <div className="about-portrait">
              <div className="lab">[ 待填入：個人形象照 ]</div>
            </div>
          </aside>

          <div className="about-body reveal" style={{ transitionDelay: '.15s' }}>
            <p>
              [ 待填入：開場白段落，建議 60–100 字 ]<br />
              <br />
              撰寫方向：描述自己的工作狀態是「難以被單一定義的」，列出幾個你曾扮演的角色，以輕鬆語氣收尾。
            </p>

            <h4 className="about-subtitle">
              [ 待填入：副標題，建議呼應「說故事」或「幕後工作觀」]
            </h4>
            <p>
              [ 待填入：工作哲學段落，建議 80–120 字 ]<br />
              <br />
              撰寫方向：從劇場、攝影或某個具體經驗出發，說明你如何面對複雜的執行現場。
            </p>

            <h4 className="about-subtitle">
              [ 待填入：副標題，建議呼應「把事情做完」或「跨領域優勢」]
            </h4>
            <p>
              [ 待填入：能力宣言段落，建議 80–120 字 ]<br />
              <br />
              撰寫方向：說明跨領域不是弱點而是優勢的具體原因，最後一句以「你需要⋯⋯我在這裡」或類似結構收尾。
            </p>

            <div className="skills">
              {['劇場製作', '視覺設計', '活動企劃', '攝影', '世界觀設計', '小說撰寫', '文案企劃'].map((s) => (
                <span key={s} className="skill">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
