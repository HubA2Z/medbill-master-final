import Link from 'next/link';
import ArticleLayout, { articleMeta } from '@/components/ArticleLayout';
import { Callout } from '@/components/ui';

const SLUG = '/blog/accounts-receivable-follow-up-guide';
export const metadata = articleMeta(SLUG);

export default function Page() {
  return (
    <ArticleLayout
      slug={SLUG}
      cta={{ title: 'Is your A/R getting older every month?', body: 'Our A/R team works aged claims, payer calls, and denials for practices every day. Start with a free 48-hour audit of your aging report.', label: 'Get a free A/R audit', href: '/audit' }}
    >
      <p className="lead">
        Accounts receivable follow-up is the work of turning unpaid claims into payments, corrections, or appeals before they age past the point of recovery. Done well, it is a daily routine: read the aging report, decide what to work first, check claim status, act on what you find, and document it so the next person can pick up where you left off. This guide covers each step, plus the KPIs that show whether it’s working.
      </p>

      <h2>How to read an aging report</h2>
      <p>An aging report groups open balances by how long they have been outstanding. Most systems use buckets like these:</p>
      <div className="not-prose overflow-x-auto my-6">
        <table className="table-clinical">
          <thead>
            <tr>
              <th>Bucket</th>
              <th>What it usually means</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0–30 days</td>
              <td>Recently billed. Most claims are still in normal processing.</td>
            </tr>
            <tr>
              <td>31–60 days</td>
              <td>Should have paid or denied by now for most electronic claims. Start status checks.</td>
            </tr>
            <tr>
              <td>61–90 days</td>
              <td>Something is likely wrong: missing claim, pended request, or unworked denial.</td>
            </tr>
            <tr>
              <td>91–120 days</td>
              <td>High risk. Timely filing and appeal deadlines are getting close.</td>
            </tr>
            <tr>
              <td>120+ days</td>
              <td>Hardest to collect. Decide quickly whether to appeal, correct, or write off.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Check what date the report ages from. Some systems age from the date of service, others from the first billed date or the last billed date. Aging from the last billed date makes resubmitted claims look newer than they are, which hides timely filing risk. Run the report by payer and by provider as well as in total, so you can see where the problem sits.</p>

      <h2>Payer A/R vs patient A/R</h2>
      <p>Keep the two apart. <strong>Payer A/R</strong> is money owed by insurance plans, and it is worked by status checks, corrections, and appeals. <strong>Patient A/R</strong> is money owed by patients after insurance has processed, and it is worked through statements, payment plans, and your collection policy.</p>
      <p>A balance should only move to the patient when the remit shows patient responsibility (deductible, coinsurance, copay, or a non-covered service the patient agreed to). If an insurance balance is sitting in patient A/R, or a patient balance is stuck in payer A/R, your aging numbers are wrong. Our guide to <Link href="/blog/payment-posting-era-guide">payment posting and ERA reconciliation</Link> covers how balances should transfer.</p>

      <h2>How to prioritize: dollars, age, and deadlines</h2>
      <p>You can’t work every claim every day, so sort the work. Three factors matter most:</p>
      <ol>
        <li><strong>Timely filing risk:</strong> claims near the payer’s filing or appeal deadline go first, whatever the amount. Once the deadline passes, the money is usually gone. See our <Link href="/blog/timely-filing-limits-guide">timely filing limits guide</Link>.</li>
        <li><strong>Dollar amount:</strong> within each age range, work higher balances first. One call on a large claim can recover more than a day of small ones.</li>
        <li><strong>Age:</strong> older claims are harder to collect, so don’t let the middle buckets drift while you chase the oldest ones.</li>
      </ol>
      <p>Group claims by payer when you can. One call or portal session can cover several claims for the same payer, and patterns show up faster.</p>

      <h2>Checking claim status</h2>
      <ul>
        <li><strong>Payer portal:</strong> the fastest option for most commercial plans and Medicare Advantage plans. Many plans are available through Availity or the payer’s own provider site.</li>
        <li><strong>276/277 transactions:</strong> an electronic claim status inquiry (276) and response (277), usually through your clearinghouse or practice management system. Useful for checking many claims at once.</li>
        <li><strong>Phone:</strong> needed when the portal shows nothing useful, the claim is pended, or you need an explanation. Calls take longer, so save them for claims that need them.</li>
      </ul>
      <p>Before you check status, confirm the claim was accepted. A claim rejected by the clearinghouse never reached the payer, and it won’t show in their system. See our <Link href="/blog/clearinghouse-rejections-guide">clearinghouse rejections guide</Link>.</p>

      <h2>What to ask on a payer call</h2>
      <p>Have the patient name, date of birth, member ID, date of service, billed amount, and your NPI and tax ID ready. Then ask:</p>
      <ul>
        <li>Is the claim on file? What date was it received?</li>
        <li>What is the claim number and current status?</li>
        <li>If paid: the paid date, amount, check or EFT number, and the address or account it was sent to.</li>
        <li>If denied: the reason, the denial code, and whether it can be corrected or must be appealed. What is the appeal deadline and address?</li>
        <li>If pended: what is needed, where to send it, and by when.</li>
        <li>Can the claim be reprocessed over the phone?</li>
        <li>The representative’s name and the call reference number.</li>
      </ul>
      <p>Document every call the same way: date, payer, who you spoke with, what you learned, what you did, the reference number, and the next follow-up date. Our <Link href="/call-note-builder">call note builder</Link> creates a consistent note in seconds.</p>

      <h2>Common claim statuses and what to do next</h2>
      <ul>
        <li><strong>No claim on file:</strong> check the clearinghouse acceptance report. If it was accepted, get the payer acknowledgment and resubmit with proof of the original date. If it wasn’t, fix the rejection and submit.</li>
        <li><strong>In process:</strong> ask when it was received and the expected processing time. Set a follow-up date instead of calling again tomorrow.</li>
        <li><strong>Pended for records or information:</strong> find out exactly what’s needed (medical records, itemized bill, accident details, coordination of benefits update from the patient). Send it and log the date sent. Many pended claims deny if the request isn’t answered.</li>
        <li><strong>Denied:</strong> get the CARC and RARC and decide whether to correct or appeal. See <Link href="/blog/claim-denial-codes-explained">claim denial codes explained</Link> and the <Link href="/blog/medical-claim-appeal-guide">appeal guide</Link>.</li>
        <li><strong>Paid to the wrong provider or address:</strong> get the check or EFT details. Ask the payer how to request a reissue, and check your enrollment records for an outdated address, tax ID, or group affiliation.</li>
        <li><strong>Paid, but not posted:</strong> the payment arrived, but nobody posted it. Find the ERA or deposit and send it to payment posting.</li>
      </ul>

      <h2>Work queues and daily targets</h2>
      <p>Assign A/R by payer, by aging bucket, or by denial type, so each person owns a defined queue. Set daily targets based on your own data: how long a typical portal check, call, or appeal takes your team, and how many claims each queue holds. Targets should count claims <em>resolved</em> or moved forward, not just touched. A note that says “still in process” with no follow-up date isn’t progress.</p>
      <p>Every worked claim should end with a next action and a follow-up date, so it comes back to the queue at the right time instead of being forgotten.</p>

      <Callout title="Fix the cause, not just the claim">
        If the same status keeps showing up for one payer or provider, such as missing claims or the same denial, report it. A registration, enrollment, or coding fix upstream saves far more time than working each claim. See <Link href="/blog/reduce-claim-denials">how to reduce claim denials</Link>.
      </Callout>

      <h2>When to escalate</h2>
      <ul>
        <li>The payer has given different answers on repeated calls, or promised reprocessing that never happened.</li>
        <li>A claim is close to a filing or appeal deadline and the payer hasn’t acted.</li>
        <li>A pattern affects many claims, such as a fee schedule loaded wrong or claims routed to the wrong plan.</li>
      </ul>
      <p>Escalate to a supervisor or claims manager at the payer, your provider relations representative, or the payer’s formal dispute process. Bring your call reference numbers. For state-regulated plans, a state insurance department complaint may be an option when the payer doesn’t respond.</p>

      <h2>KPIs that show whether A/R follow-up is working</h2>
      <ul>
        <li><strong>Days in A/R:</strong> total A/R divided by average daily gross charges over a set period (often the last three or six months). It estimates how long it takes to collect.</li>
        <li><strong>Percent of A/R over 90 days:</strong> the balance older than 90 days divided by total A/R. It shows how much of your A/R is at risk.</li>
        <li><strong>First-pass resolution rate:</strong> the share of claims paid or resolved on the first submission without rework. A low rate means more claims enter follow-up.</li>
      </ul>
      <p>Benchmarks vary by specialty, payer mix, and how a practice defines each measure. Track your own numbers the same way every month and watch the trend. Our <Link href="/audit">free audit</Link> can help you set a baseline.</p>

      <h2>Frequently asked questions</h2>
      <h3>How often should a claim be followed up?</h3>
      <p>Check status once a claim is past the payer’s normal processing time, then follow up on the date set by your last action. Avoid calling on a fixed schedule when the payer has already given you a date.</p>
      <h3>Should I work the oldest claims first?</h3>
      <p>Not always. Work claims near filing or appeal deadlines first, then higher balances, and keep the 31–90 day buckets moving so they don’t become your next 120+ problem.</p>
      <h3>What is a 276/277?</h3>
      <p>It is the electronic claim status inquiry (276) and response (277) used to check status through a clearinghouse or system instead of a portal or phone call.</p>
      <h3>When should A/R be written off?</h3>
      <p>Only after appeal options are exhausted or the balance can’t be recovered, and according to your practice’s written adjustment policy. Use the right adjustment code so write-offs can be tracked by reason.</p>

      <p><em>This guide is general information. Claim status processes, filing deadlines, and appeal rules vary by payer and contract; always confirm with the payer’s provider manual or provider services.</em></p>
    </ArticleLayout>
  );
}
